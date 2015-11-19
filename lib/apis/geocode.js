var InvalidValueError = require('../invalid-value-error');
var utils = require('../utils');
var v = require('../validate');

var path = '/maps/api/geocode/json';

var validateGeocodeQuery = v.object({
  address: v.optional(v.string),
  bounds: v.optional(utils.bounds),
  components: v.optional(utils.pipedKeyValues),
  retryOptions: v.optional(utils.retryOptions)
});

var validateReverseGeocodeQuery = v.object({
  latlng: v.optional(utils.latLng),
  location_type: v.optional(utils.pipedArrayOf(v.oneOf([
    'ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'
  ]))),
  place_id: v.optional(v.string),
  result_type: v.optional(utils.pipedArrayOf(v.string)),
  retryOptions: v.optional(utils.retryOptions)
});

exports.inject = function(makeApiCall) {
  return {

    geocode: function(query, callback) {
      query = validateGeocodeQuery(query);
      if (query.address && query.components) {
        throw new InvalidValueError(
            'cannot specify both address and components');
      }
      return makeApiCall(path, query, callback);
    },

    reverseGeocode: function(query, callback) {
      query = validateReverseGeocodeQuery(query);
      if (query.latlng && query.place_id) {
        throw new InvalidValueError('cannot specify both latlng and place_id');
      }
      return makeApiCall(path, query, callback);
    }

  };
};
