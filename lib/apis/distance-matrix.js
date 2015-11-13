var convert = require('../convert');
var path = '/maps/api/distancematrix/json';
var modes = new Set(['driving', 'walking', 'bicycling', 'transit']);
var avoids = new Set(['tolls', 'highways', 'ferries']);

exports.inject = (makeApiCall) => ({

  distanceMatrix: (query, callback) => {

    if (!query.origins || !query.destinations) {
      throw 'origins and destinations params required';
    } else if (query.departure_time && query.arrival_time) {
      throw 'should not specify both departure_time and arrival_time params';
    } else if (query.mode && !modes.has(query.mode)) {
      throw 'invalid mode param';
    } else if (query.avoid && !avoids.has(query.avoid)) {
      throw 'invalid avoid param';
    }

    query.origins = convert.locations(query.origins);
    query.destinations = convert.locations(query.destinations);

    if (query.avoid) {
      query.avoid = convert.piped(query.avoid);
    }

    if (query.departure_time) {
      query.departure_time = convert.timeStamp(query.departure_time);
    }

    if (query.arrival_time) {
      query.arrival_time = convert.timeStamp(query.arrival_time);
    }

    if (query.transit_mode) {
      query.transit_mode = convert.piped(query.transit_mode);
    }

    return makeApiCall(path, query, callback);

  },

});
