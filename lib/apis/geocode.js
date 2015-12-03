var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * @name geocode
 * @function
 *
 * @param {Object} query
 * @param {string} [query.address]
 * @param {Object} [query.components]
 * @param {Object} [query.bounds]
 * @param {latlng} query.bounds.southwest
 * @param {latlng} query.bounds.northeast
 * @param {string} [query.region]
 * @param {string} [query.language]
 * @param {callback} callback Callback function for handling the result
 */
exports.geocode = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['address', 'components']),
    v.object({
      address: v.optional(v.string),
      components: v.optional(utils.pipedKeyValues),
      bounds: v.optional(utils.bounds),
      region: v.optional(v.string),
      language: v.optional(v.string),
      retryOptions: v.optional(utils.retryOptions)
    })
  ])
};

/**
 * @name reverseGeocode
 * @function
 *
 * @param {Object} query
 * @param {latlng} query.latlng
 * @param {string} [query.result_type]
 * @param {string} [query.location_type]
 * @param {string} [query.language]
 * @param {callback} callback Callback function for handling the result
 */
exports.reverseGeocode = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['latlng', 'place_id']),
    v.object({
      latlng: v.optional(utils.latLng),
      result_type: v.optional(utils.pipedArrayOf(v.string)),
      location_type: v.optional(utils.pipedArrayOf(v.oneOf([
        'ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'
      ]))),
      language: v.optional(v.string),
      retryOptions: v.optional(utils.retryOptions)
    })
  ])
};
