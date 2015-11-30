/**
 * Initializes the Google Maps service.
 *
 * Options include:
 *
 *  - key: API key (required, unless clientID / clientSecret provided).
 *
 *  - clientID: Maps API for Work - client ID.
 *
 *  - clientSecret: Maps API for Work - client secret (aka private key).
 *
 *  - makeUrlRequest: The function to use for making HTTP GET requests. It will
 *    be called with arguments (url, callback). It must call the callback with
 *    arguments (err, response). If successful, the response should be an object
 *    of the form
 *    {
 *      status: number,
 *      headers: Object,
 *      json: Object
 *    }
 *
 *  - Promise: The Promise constructor. If supplied, the API methods will return
 *    handles with an .asPromise() method.
 *
 *  - retryOptions: Specifies the default retry strategy.
 *    {
 *      timeout: Number of milliseconds to continue retrying failing requests.
 *          (default = 60 * 1000)
 *      interval: Number of milliseconds to wait before the first retry.
 *          (default = 500)
 *      increment: Factor by which to increment the interval for subsequent
 *          retries. (default = 1.5)
 *      jitter: Amount of random delay to add (or subtract) from the interval,
 *          as a factor of the interval. (default = 0.5)
 *    }
 *
 * @param {Object} options
 * @return {Object} The API service object containing methods for geocode, etc.
 */
exports.init = function(options) {

  options = options || {};

  var makeUrlRequest = options.makeUrlRequest || require('./make-url-request');
  var Promise = options.Promise;
  var mySetTimeout = options.setTimeout || setTimeout;
  var rate = options.rate || {};
  var rateLimit = rate.limit || 10;  // 10 requests per ratePeriod.
  var ratePeriod = rate.period || 1000;  // 1 second.
  var getTime = options.getTime || function() {
    return new Date().getTime();
  };

  var url = require('url');
  var attempt = require('./attempt')
      .inject(mySetTimeout, getTime)
      .attempt;

  var ThrottledQueue = require('./throttled-queue')
      .inject(mySetTimeout, getTime);
  var requestQueue = ThrottledQueue.create(rateLimit, ratePeriod);

  /**
   * Makes an API request using the injected makeUrlRequest.
   *
   * Inserts the API key (or client ID and signature) into the query
   * parameters. Retries requests when the status code requires it.
   * Parses the response body as JSON.
   *
   * The callback is given either an error or a response. The response
   * is an object with the following entries:
   * {
   *   status: number,
   *   body: string,
   *   json: Object
   * }
   *
   * @param {string} path
   * @param {Object} query This function mutates the query object.
   * @param {Function} callback
   * @return {{
   *   cancel: function(),
   *   asPromise: function(): Promise  // TODO
   * }}
   */
  var makeApiCall = function(path, query, callback) {

    var key = options.key || process.env.GOOGLE_MAPS_API_KEY;
    var clientId = options.clientId || process.env.GOOGLE_MAPS_API_CLIENT_ID;
    var clientSecret = options.clientSecret || process.env.GOOGLE_MAPS_API_CLIENT_SECRET;
    var useClientId = query.supportsClientId && clientId && clientSecret;
    var retryOptions = query.retryOptions || options.retryOptions || {};

    delete query.retryOptions;
    delete query.supportsClientId;

    if (useClientId) {
      query.client = clientId;
    } else if (key && key.indexOf('AIza') == 0) {
      query.key = key;
    } else {
      throw 'Missing either a valid API key, or a client ID and secret';
    }

    var requestUrl = url.format({
      pathname: path,
      query: query
    });

    // When using client ID, generate and append the signature param.
    if (useClientId) {
      var secret = new Buffer(clientSecret, 'base64');
      var payload = url.parse(requestUrl).path;
      var signature = new Buffer(require('crypto').createHmac('sha1', secret)
          .update(payload).digest('base64')).toString()
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      while (signature.length % 4) {
        signature += '=';
      }
      requestUrl += '&signature=' + encodeURIComponent(signature);
    }

    var handle = attempt({
      'do': function(callback) {
        return requestQueue.add(function() {
          makeUrlRequest(requestUrl, callback);
        }, function(err, result) {
          if (err != null) {
            callback(err, null);
          }
          // Ignore the result of makeUrlRequest().
        });
      },
      until: function(response) {
        return response
        && response.status !== 500
        && response.status !== 503
        && response.status !== 504;
      },
      interval: retryOptions.interval,
      increment: retryOptions.increment,
      jitter: retryOptions.jitter,
      timeout: retryOptions.timeout
    }, function(err, response) {
      callback && callback(err, response);
      if (err) {
        pReject && pReject(err);
      } else {
        pResolve && pResolve(response);
      }
    });

    var pResolve, pReject;
    if (Promise) {
      var promise = new Promise(function(resolve, reject) {
        pResolve = resolve;
        pReject = reject;
      });
      handle.asPromise = function() {
        return promise;
      };
    }

    return handle;
  };

  var makeApiMethod = function(apiConfig) {
    return function(query, callback) {
      query = apiConfig.validator(query);
      query.supportsClientId = apiConfig.supportsClientId !== false;
      return makeApiCall(apiConfig.url, query, callback);
    };
  };

  var geocode = require('./apis/geocode');
  var timezone = require('./apis/timezone');
  var directions = require('./apis/directions');
  var distanceMatrix = require('./apis/distance-matrix');
  var elevation = require('./apis/elevation');
  var roads = require('./apis/roads');
  var places = require('./apis/places');

  return {
    directions: makeApiMethod(directions.directions),
    distanceMatrix: makeApiMethod(distanceMatrix.distanceMatrix),
    elevation: makeApiMethod(elevation.elevation),
    elevationAlongPath: makeApiMethod(elevation.elevationAlongPath),
    geocode: makeApiMethod(geocode.geocode),
    reverseGeocode: makeApiMethod(geocode.reverseGeocode),
    places: makeApiMethod(places.places),
    place: makeApiMethod(places.place),
    placesPhoto: makeApiMethod(places.placesPhoto),
    placesAutoComplete: makeApiMethod(places.placesAutoComplete),
    snapToRoads: makeApiMethod(roads.snapToRoads),
    speedLimits: makeApiMethod(roads.speedLimits),
    snappedSpeedLimits: makeApiMethod(roads.snappedSpeedLimits),
    timezone: makeApiMethod(timezone.timezone)
  };

};
