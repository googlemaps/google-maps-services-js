var convert = require('../convert');
var path = '/maps/api/directions/json';
var modes = new Set(['driving', 'walking', 'bicycling', 'transit']);

exports.inject = (makeApiCall) => ({

  directions: (query, callback) => {

    if (!query.origin || !query.destination) {
      throw 'origin and destination params required';
    } else if (query.departure_time && query.arrival_time) {
      throw 'should not specify both departure_time and arrival_time params';
    } else if (query.mode && !modes.has(query.mode)) {
      throw 'invalid mode param';
    }

    query.origin = convert.latLng(query.origin);
    query.destination = convert.latLng(query.destination);

    if (query.waypoints) {
      query.waypoints = convert.locations(query.waypoints);
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
      query.avoid = convert.piped(query.avoid);
    }

    if (query.departure_time) {
      query.departure_time = convert.timeStamp(query.departure_time);
    }

    if (query.arrival_time) {
      query.arrival_time = convert.timeStamp(query.arrival_time);
    }

    return makeApiCall(path, query, callback);

  },

});
