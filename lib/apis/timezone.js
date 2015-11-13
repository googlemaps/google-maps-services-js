var convert = require('../convert');
var path = '/maps/api/timezone/json';

exports.inject = (makeApiCall) => ({

  timezone: (query, callback) => {
    if (!query.location) {
      throw 'location param required';
    }
    query.location = convert.latLng(query.location);
    query.timestamp = convert.timeStamp(query.timestamp);
    return makeApiCall(path, query, callback);
  },

});
