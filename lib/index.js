/**
 * Google Maps Service module.
 * @module @google/maps
 */

/**
 * Initializes the Google Maps service.
 *
 * @param {Object} options
 * @param {string} options.key - API key (required, unless clientID / clientSecret provided).
 * @param {string=} options.clientId - Maps API for Work - client ID.
 * @param {string=} options.clientSecret - Maps API for Work - client secret (aka private key).
 * @param {number=} options.rate.limit - Maximum number of requests per period (default: 10).
 * @param {number=} options.rate.period - Period for rate limit (default: 1000 ms).
 * @param {Function=} options.Promise - Promise constructor (optional).
 * @return {GoogleMapsClient} The client object containing all API methods.
 */
 exports.init = function(options) {

  var makeApiCall = require('./internal/make-api-call').inject(options || {});

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

