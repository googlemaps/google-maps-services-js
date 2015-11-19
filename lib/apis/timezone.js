var utils = require('../utils');
var v = require('../validate');

var path = '/maps/api/timezone/json';

var validateTimezoneQuery = v.object({
  location: utils.latLng,
  retryOptions: v.optional(utils.retryOptions),
  timestamp: utils.timeStamp
});

exports.inject = function(makeApiCall) {
  return {

    timezone: function(query, callback) {
      return makeApiCall(path, validateTimezoneQuery(query), callback);
    }

  };
};
