var utils = require('../utils');
var v = require('../validate');

var validateTimezoneQuery = v.object({
  location: utils.latLng,
  retryOptions: v.optional(utils.retryOptions),
  timestamp: utils.timeStamp
});

exports.inject = function(url, makeApiCall) {
  return {

    timezone: function(query, callback) {
      query = validateTimezoneQuery(query);
      return makeApiCall(url, query, callback);
    }

  };
};
