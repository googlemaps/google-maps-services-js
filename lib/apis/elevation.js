var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * Makes an elevation request.
 *
 * @name GoogleMapsClient#elevation
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.locations
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevation = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    locations: utils.pipedArrayOf(utils.latLng),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * Makes an elevation-along-path request.
 *
 * @name GoogleMapsClient#elevationAlongPath
 * @function
 * @param {Object} query
 * @param {LatLng[]|string} query.path
 * @param {number} query.samples
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevationAlongPath = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    path: function(path) {
      if (typeof path == 'string') {
        return 'enc:' + path;
      } else {
        return utils.pipedArrayOf(utils.latLng)(path);
      }
    },
    samples: v.number,
    retryOptions: v.optional(utils.retryOptions)
  })
};
