var utils = require('../utils');

exports.inject = function(url, makeApiCall) {
  return {

    timezone: function(query, callback) {
      if (!query.location) {
        throw 'location param required';
      }
      query.location = utils.latLng(query.location);
      query.timestamp = utils.timeStamp(query.timestamp);
      return makeApiCall(url, query, callback);
    }

  };
};
