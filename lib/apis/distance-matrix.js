var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * Makes a distance matrix request.
 *
 * @name GoogleMapsClient#distanceMatrix
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.origins
 * @param {LatLng[]} query.destinations
 * @param {string} [query.mode]
 * @param {string} [query.language]
 * @param {string[]} [query.avoid]
 * @param {string} [query.units]
 * @param {Date|number} [query.departure_time]
 * @param {Date|number} [query.arrival_time]
 * @param {string[]} [query.transit_mode]
 * @param {string} [query.transit_routing_preference]
 * @param {string} [query.traffic_model]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.distanceMatrix = {
  url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
    v.object({
      origins: utils.pipedArrayOf(utils.latLng),
      destinations: utils.pipedArrayOf(utils.latLng),
      mode: v.optional(v.oneOf([
        'driving', 'walking', 'bicycling', 'transit'
      ])),
      language: v.optional(v.string),
      avoid: v.optional(utils.pipedArrayOf(v.oneOf([
        'tolls', 'highways', 'ferries', 'indoor'
      ]))),
      units: v.optional(v.oneOf(['metric', 'imperial'])),
      departure_time: v.optional(utils.timeStamp),
      arrival_time: v.optional(utils.timeStamp),
      transit_mode: v.optional(utils.pipedArrayOf(v.oneOf[
        'bus', 'subway', 'train', 'tram', 'rail'
      ])),
      transit_routing_preference: v.optional(v.oneOf([
        'less_walking', 'fewer_transfers'
      ])),
      traffic_model: v.optional(v.oneOf([
        'best_guess', 'pessimistic', 'optimistic'
      ])),
      retryOptions: v.optional(utils.retryOptions)
    })
  ])
};
