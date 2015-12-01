var utils = require('../internal/utils');
var v = require('../internal/validate');

exports.geocode = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['address', 'components']),
    v.object({
      address: v.optional(v.string),
      bounds: v.optional(utils.bounds),
      components: v.optional(utils.pipedKeyValues),
      retryOptions: v.optional(utils.retryOptions)
    })
  ])
};

exports.reverseGeocode = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['latlng', 'place_id']),
    v.object({
      latlng: v.optional(utils.latLng),
      location_type: v.optional(utils.pipedArrayOf(v.oneOf([
        'ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'
      ]))),
      place_id: v.optional(v.string),
      result_type: v.optional(utils.pipedArrayOf(v.string)),
      retryOptions: v.optional(utils.retryOptions)
    })
  ])
};
