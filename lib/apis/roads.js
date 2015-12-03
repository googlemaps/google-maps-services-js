var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * @name snapToRoads
 * @function
 *
 * @param {Object} query
 * @param {latlng[]} query.path
 * @param {boolean} [query.interpolate]
 * @param {callback} callback Callback function for handling the result
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
 * @name speedLimits
 * @function
 *
 * @param {Object} query
 * @param {string[]} query.placeId
 * @param {callback} callback Callback function for handling the result
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
 * @name snappedSpeedLimits
 * @function
 *
 * @param {Object} query
 * @param {latlng[]} query.path
 * @param {callback} callback Callback function for handling the result
 */
exports.snappedSpeedLimits = {
  url: 'https://roads.googleapis.com/v1/speedLimits',
  supportsClientId: false,
  validator: v.object({
    path: utils.pipedArrayOf(utils.latLng),
    retryOptions: v.optional(utils.retryOptions)
  })
};
