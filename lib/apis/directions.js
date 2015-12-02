var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * @name directions
 * @function
 * @instance
 *
 * @param {Object} query
 * @param {latlng} query.origin
 * @param {latlng} query.destination
 * @param {string} [query.mode]
 * @param {latlng[]} [query.waypoints]
 * @param {boolean} [query.alternatives]
 * @param {string[]} [query.avoid]
 * @param {string} [query.language]
 * @param {string} [query.units]
 * @param {string} [query.region]
 * @param {Date|number} [query.arrival_time]
 * @param {Date|number} [query.departure_time]
 * @param {string} [query.traffic_model]
 * @param {string[]} [query.transit_mode]
 * @param {string} [query.transit_routing_preference]
 * @param {boolean} [query.optimize]
 * @param {callback} callback Callback function for handling the result
 */
exports.directions = {
  url: 'https://maps.googleapis.com/maps/api/directions/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
    v.object({
      origin: utils.latLng,
      destination: utils.latLng,
      mode: v.optional(v.oneOf([
        'driving', 'walking', 'bicycling', 'transit'
      ])),
      waypoints: v.optional(utils.pipedArrayOf(utils.latLng)),
      alternatives: v.optional(v.boolean),
      avoid: v.optional(utils.pipedArrayOf(v.oneOf([
        'tolls', 'highways', 'ferries', 'indoor'
      ]))),
      language: v.optional(v.string),
      units: v.optional(v.oneOf(['metric', 'imperial'])),
      region: v.optional(v.string),
      arrival_time: v.optional(utils.timeStamp),
      departure_time: v.optional(utils.timeStamp),
      traffic_model: v.optional(v.oneOf([
        'best_guess', 'pessimistic', 'optimistic'
      ])),
      transit_mode: v.optional(utils.pipedArrayOf(v.oneOf([
        'bus', 'subway', 'train', 'tram', 'rail'
      ]))),
      transit_routing_preference: v.optional(v.oneOf([
        'less_walking', 'fewer_transfers'
      ])),
      optimize: v.optional(v.boolean)
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
