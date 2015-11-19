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
      query = validateTimezoneQuery(query);
      return makeApiCall(path, query, callback);
    }

  };
};
