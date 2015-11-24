var utils = require('../utils');
var v = require('../validate');

var validateElevationQuery = v.object({
  locations: utils.pipedArrayOf(utils.latLng)
});

var validateElevationAlongPathQuery = v.compose([
  v.object({
    path: v.either([v.array(utils.latLng), v.string]),
    samples: v.number
  }),
  function(query) {
    if (typeof query.path == 'string') {
      query.path = 'enc:' + query.path;
    } else {
      query.path = utils.pipedArrayOf(utils.latLng)(query.path);
    }
    return query;
  }
]);

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
