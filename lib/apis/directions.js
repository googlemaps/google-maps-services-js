var utils = require('../utils');
var path = '/maps/api/directions/json';
var modes = utils.Set(['driving', 'walking', 'bicycling', 'transit']);

exports.inject = function(makeApiCall) {
  return {

    directions: function(query, callback) {

      if (!query.origin || !query.destination) {
        throw 'origin and destination params required';
      } else if (query.departure_time && query.arrival_time) {
        throw 'should not specify both departure_time and arrival_time params';
      } else if (query.mode && !modes.has(query.mode)) {
        throw 'invalid mode param';
      }

      query.origin = utils.latLng(query.origin);
      query.destination = utils.latLng(query.destination);

      if (query.waypoints) {
        query.waypoints = utils.locations(query.waypoints);
        if (query.optimize) {
          query.waypoints = 'optimize:true|' + query.waypoints;
        }
      }
      delete query.optimize;

      if (query.alternatives) {
        query.alternatives = 'true';
      } else {
        delete query.alternatives;
      }

      if (query.avoid) {
        query.avoid = utils.piped(query.avoid);
      }

      if (query.departure_time) {
        query.departure_time = utils.timeStamp(query.departure_time);
      }

      if (query.arrival_time) {
        query.arrival_time = utils.timeStamp(query.arrival_time);
      }

      return makeApiCall(path, query, callback);

    }

  };
};
