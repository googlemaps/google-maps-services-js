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

  var makeApiCall = require('./make-api-call').inject(options || {});

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
