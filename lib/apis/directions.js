var utils = require('../utils');
var InvalidValueError = require('../invalid-value-error');
var v = require('../validate');

var path = '/maps/api/directions/json';

var validateDirectionsQuery = v.object({
  alternatives: v.optional(v.boolean),
  arrival_time: v.optional(utils.timeStamp),
  avoid: v.optional(utils.pipedArrayOf(v.oneOf([
    'tolls', 'highways', 'ferries', 'indoor'
  ]))),
  departure_time: v.optional(utils.timeStamp),
  destination: utils.latLng,
  mode: v.optional(v.oneOf(['driving', 'walking', 'bicycling', 'transit'])),
  optimize: v.optional(v.boolean),
  origin: utils.latLng,
  retryOptions: v.optional(utils.retryOptions),
  units: v.optional(v.oneOf(['metric', 'imperial'])),
  waypoints: v.optional(utils.pipedArrayOf(utils.latLng))
});

exports.inject = function(makeApiCall) {
  return {

    directions: function(query, callback) {
      query = validateDirectionsQuery(query);

      if (query.departure_time && query.arrival_time) {
        throw new InvalidValueError(
            'should not specify both departure_time and arrival_time');
      }

      if (query.waypoints && query.optimize) {
        query.waypoints = 'optimize:true|' + query.waypoints;
      }
      delete query.optimize;

      return makeApiCall(path, query, callback);
    }

  };
};
