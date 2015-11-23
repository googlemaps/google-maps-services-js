var utils = require('../utils');

exports.inject = function(url, makeApiCall) {
  return {

    geocode: function(query, callback) {
      if (query.components) {
        query.components = utils.components(query.components);
      }
      if (query.bounds) {
        query.bounds = utils.bounds(query.bounds);
      }
      return makeApiCall(url, query, callback);
    },

    reverseGeocode: function(query, callback) {
      if (!query.latlng && !query.place_id) {
        throw 'latlong or place_id param required';
      }
      if (query.latlng) {
        query.latlng = utils.latLng(query.latlng);
      }
      if (query.result_type) {
        query.result_type = utils.piped(query.result_type);
      }
      if (query.location_type) {
        query.location_type = utils.piped(query.location_type);
      }
      return makeApiCall(url, query, callback);
    }

  };
};
