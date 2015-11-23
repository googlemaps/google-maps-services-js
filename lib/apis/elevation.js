var utils = require('../utils');

exports.inject = function(url, makeApiCall) {
  return {

    elevation: function(query, callback) {
      if (!query.locations) {
        throw 'locations param required';
      }
      query.locations = utils.locations(query.locations);
      return makeApiCall(url, query, callback);
    },

    elevationAlongPath: function(query, callback) {
      if (!query.path || !query.samples) {
        throw 'path and samples params required';
      }
      if (typeof query.path == 'string') {
        query.path = 'enc:' + query.path;
      } else {
        query.path = utils.locations(query.path);
      }
      return makeApiCall(url, query, callback);
    }

  };
};
