var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * @name elevation
 * @function
 *
 * @param {Object} query
 * @param {latlng[]} query.locations
 * @param {callback} callback Callback function for handling the result
 */
exports.elevation = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    locations: utils.pipedArrayOf(utils.latLng),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * @name elevationAlongPath
 * @function
 *
 * @param {Object} query
 * @param {latlng[]|string} query.path
 * @param {number} query.samples
 * @param {callback} callback Callback function for handling the result
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
