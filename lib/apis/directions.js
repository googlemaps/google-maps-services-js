var utils = require('../internal/convert');
var v = require('../internal/validate');

exports.directions = {
  url: 'https://maps.googleapis.com/maps/api/directions/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
    v.object({
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
    }),
    function(query) {
      if (query.waypoints && query.optimize) {
        query.waypoints = 'optimize:true|' + query.waypoints;
      }
      delete query.optimize;
      return query;
    }
  ])
};
