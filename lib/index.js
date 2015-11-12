/**
 * Initializes the Google Maps service.
 *
 * Options include:
 *  - makeUrlRequest: The function to use for making HTTP GET requests. It will
 *    be called with arguments (url, callback). It must call the callback with
 *    arguments (err, response). If successful, the response should be an object
 *    of the form
 *    {
 *      status: number,
 *      body: string
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
 * @param {string} key API key (required).
 * @param {Object} options
 * @return {Object} The API service object containing methods for geocode, etc.
 */
exports.init = (key, options) => {
  if (!key || key.indexOf('AIza') != 0) {
    throw 'Missing or invalid API key';
  }

  options = options || {};
  var makeUrlRequest = options.makeUrlRequest || require('./make-url-request');
  var Promise = options.Promise;

  var url = require('url');
  var attempt = require('./attempt')
      .inject(setTimeout, () => +new Date)
      .attempt;

  /**
   * Makes an API request using the injected makeUrlRequest.
   *
   * Inserts the API key into the query parameters. Retries requests when the
   * status code requires it. Parses the response body as JSON.
   *
   * The callback is given either an error or a response. The response is an
   * object with the following entries:
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
  var makeApiCall = (path, query, callback) => {
    query.key = query.key || key;

    var retryOptions = query.retryOptions || options.retryOptions || {};
    delete query.retryOptions;

    var requestUrl = url.format({
      pathname: 'https://maps.googleapis.com' + path,
      query: query
    });

    var handle = attempt({
      'do': (callback) => {
        makeUrlRequest(requestUrl, callback);
      },
      until: (response) => (
        response
        && response.status !== 500
        && response.status !== 503
        && response.status !== 504
      ),
      interval: retryOptions.interval,
      increment: retryOptions.increment,
      jitter: retryOptions.jitter,
      timeout: retryOptions.timeout
    }, (err, response) => {
      if (err) {
        callback && callback(err, null);
        pReject && pReject(err);
        return;
      }
      try {
        response.json = JSON.parse(response.body);
      } catch (e) {
        callback && callback(e, null);
        pReject && pReject(e);
        return;
      }
      callback && callback(null, response);
      pResolve && pResolve(response);
    });

    var pResolve, pReject;
    if (Promise) {
      var promise = new Promise((resolve, reject) => {
        pResolve = resolve;
        pReject = reject;
      });
      handle.asPromise = () => promise;
    }

    return handle;
  };

  var geocode = require('./apis/geocode').inject(makeApiCall);
  var timezone = require('./apis/timezone').inject(makeApiCall);

  return {
    geocode: geocode.geocode,
    reverseGeocode: geocode.reverseGeocode,
    timezone: timezone.timezone
  };

};
