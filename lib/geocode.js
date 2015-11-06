var convert = require('./convert');

exports.inject = function(requester) {

  var path = '/maps/api/geocode/json';

  return {

    geocode: function(query, callback) {
      if (query.components) query.components = convert.components(query.components);
      if (query.bounds) query.bounds = convert.bounds(query.bounds);
      return requester(path, query, callback);
    },

    reverseGeocode: function(query, callback) {
      if (!query.latlng) throw 'latlong value required';
      if (query.result_type) query.result_type = convert.piped(query.result_type);
      if (query.location_type) query.location_type = convert.piped(query.location_type);
      return requester(path, query, callback);
    }

  };

};
