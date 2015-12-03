/**
 * @name init
 * @func
 * @desc Initializes the Google Maps service.
 *
 * @param {Object} options
 * @param {string} options.key - API key (required, unless clientID / clientSecret provided).
 * @param {string} options.clientId - Maps API for Work - client ID.
 * @param {string} options.clientSecret - Maps API for Work - client secret (aka private key).
 *
 * @return {Object} The client object containing all API methods.
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

// Note: The following are global definitions used by JSDoc.

/**
 * The callback function triggered when an API call completes.
 * @callback callback
 * @param {Object} error Error detail when an error occurs, otherwise null.
 * @param {Object} response Response object returned on success.
 * @param {number} response.status HTTP status.
 * @param {Object} response.headers HTTP headers.
 * @param {Object} response.json Deserialized JSON object for the API response.
 */

/**
 * A latitude/longitude pair - can be specified as a two-item array,
 * a comma-separated string, or an object with lat/lng or
 * latitude/longitude properties.
 * @typedef {(Object|number[]|string)} latlng
 * @property {number} [lat] latitude.
 * @property {number} [lng] longitude.
 * @property {number} [latitude] latitude.
 * @property {number} [longitude] longitude.
 */
