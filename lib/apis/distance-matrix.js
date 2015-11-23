var utils = require('../utils');
var modes = utils.Set(['driving', 'walking', 'bicycling', 'transit']);
var avoids = utils.Set(['tolls', 'highways', 'ferries']);

exports.inject = function(url, makeApiCall) {
  return {

    distanceMatrix: function(query, callback) {

      if (!query.origins || !query.destinations) {
        throw 'origins and destinations params required';
      } else if (query.departure_time && query.arrival_time) {
        throw 'should not specify both departure_time and arrival_time params';
      } else if (query.mode && !modes.has(query.mode)) {
        throw 'invalid mode param';
      } else if (query.avoid && !avoids.has(query.avoid)) {
        throw 'invalid avoid param';
      }

      query.origins = utils.locations(query.origins);
      query.destinations = utils.locations(query.destinations);

      if (query.avoid) {
        query.avoid = utils.piped(query.avoid);
      }

      if (query.departure_time) {
        query.departure_time = utils.timeStamp(query.departure_time);
      }

      if (query.arrival_time) {
        query.arrival_time = utils.timeStamp(query.arrival_time);
      }

      if (query.transit_mode) {
        query.transit_mode = utils.piped(query.transit_mode);
      }

      return makeApiCall(url, query, callback);

    }

  };
};
