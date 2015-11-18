var utils = require('../utils');
var path = '/maps/api/timezone/json';

exports.inject = function(makeApiCall) {return {

  timezone: function(query, callback) {
    if (!query.location) {
      throw 'location param required';
    }
    query.location = utils.latLng(query.location);
    query.timestamp = utils.timeStamp(query.timestamp);
    return makeApiCall(path, query, callback);
  }

}};
