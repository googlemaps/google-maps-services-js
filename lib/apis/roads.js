var utils = require('../utils');
var v = require('../validate');

var validateSnapToRoadsQuery = v.object({
  path: utils.pipedArrayOf(utils.latLng),
  interpolate: v.optional(v.boolean)
});

var validateSpeedLimitsQuery = v.object({
  placeId: v.array(v.string),
  interpolate: v.optional(v.boolean)
});

var validateSnappedSpeedLimitsQuery = v.object({
  path: utils.pipedArrayOf(utils.latLng)
});

exports.inject = function(url, makeApiCall) {
  return {

    snapToRoads: function(query, callback) {
      query = validateSnapToRoadsQuery(query);
      query.supportsClientId = false;
      return makeApiCall(url + 'snapToRoads', query, callback);
    },

    speedLimits: function(query, callback) {
      query = validateSpeedLimitsQuery(query);
      query.supportsClientId = false;
      return makeApiCall(url + 'speedLimits', query, callback);
    },

    snappedSpeedLimits: function(query, callback) {
      query = validateSnappedSpeedLimitsQuery(query);
      query.supportsClientId = false;
      return makeApiCall(url + 'speedLimits', query, callback);
    }

  };
};
