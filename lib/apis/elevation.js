var utils = require('../utils');
var v = require('../validate');

var validateElevationQuery = v.object({
  locations: utils.pipedArrayOf(utils.latLng)
});

var validateElevationAlongPathQuery = v.object({
  path: function(path) {
    if (typeof path == 'string') {
      return 'enc:' + path;
    } else {
      return utils.pipedArrayOf(utils.latLng)(path);
    }
  },
  samples: v.number
});

exports.inject = function(url, makeApiCall) {
  return {

    elevation: function(query, callback) {
      query = validateElevationQuery(query);
      return makeApiCall(url, query, callback);
    },

    elevationAlongPath: function(query, callback) {
      query = validateElevationAlongPathQuery(query);
      return makeApiCall(url, query, callback);
    }

  };
};
