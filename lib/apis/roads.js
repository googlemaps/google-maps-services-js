var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * Makes a snap-to-roads request.
 *
 * @name GoogleMapsClient#snapToRoads
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.path
 * @param {boolean} [query.interpolate]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.snapToRoads = {
  url: 'https://roads.googleapis.com/v1/snapToRoads',
  supportsClientId: false,
  validator: v.object({
    path: utils.pipedArrayOf(utils.latLng),
    interpolate: v.optional(v.boolean),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * Makes a speed-limits request.
 *
 * @name GoogleMapsClient#speedLimits
 * @function
 * @param {Object} query
 * @param {string[]} query.placeId
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.speedLimits = {
  url: 'https://roads.googleapis.com/v1/speedLimits',
  supportsClientId: false,
  validator: v.object({
    placeId: v.array(v.string),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * Makes a snap-to-roads request with speed limits.
 *
 * @name GoogleMapsClient#snappedSpeedLimits
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.path
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.snappedSpeedLimits = {
  url: 'https://roads.googleapis.com/v1/speedLimits',
  supportsClientId: false,
  validator: v.object({
    path: utils.pipedArrayOf(utils.latLng),
    retryOptions: v.optional(utils.retryOptions)
  })
};
