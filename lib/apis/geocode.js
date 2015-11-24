var utils = require('../utils');
var v = require('../validate');

var validateGeocodeQuery = v.compose([
  v.mutuallyExclusiveProperties(['address', 'components']),
  v.object({
    address: v.optional(v.string),
    bounds: v.optional(utils.bounds),
    components: v.optional(utils.pipedKeyValues),
    retryOptions: v.optional(utils.retryOptions)
  })
]);

var validateReverseGeocodeQuery = v.compose([
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
]);

exports.inject = function(url, makeApiCall) {
  return {

    geocode: function(query, callback) {
      query = validateGeocodeQuery(query);
      return makeApiCall(url, query, callback);
    },

    reverseGeocode: function(query, callback) {
      query = validateReverseGeocodeQuery(query);
      return makeApiCall(url, query, callback);
    }

  };
};
