var utils = require('../utils');

exports.inject = function(url, makeApiCall) {
  return {

    snapToRoads: function(query, callback) {
      if (!query.path) {
        throw 'path param required';
      }
      query.path = utils.locations(query.path);
      if (query.interpolate != undefined) {
        query.interpolate = String(!!query.interpolate);
      }
      return makeApiCall(url + 'snapToRoads', query, callback);
    },

    speedLimits: function(query, callback) {
      if (!query.placeId) {
        throw 'placeId param required';
      }
      return makeApiCall(url + 'speedLimits', query, callback);
    },

    snappedSpeedLimits: function(query, callback) {
      if (!query.path) {
        throw 'path param required';
      }
      query.path = utils.locations(query.path);
      return makeApiCall(url + 'speedLimits', query, callback);
    }

  };
};
