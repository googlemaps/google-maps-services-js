var utils = require('../utils');
var v = require('../validate');

exports.distanceMatrix = {
  url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
  validator: v.compose([
    v.mutuallyExclusiveProperties(['arrival_time', 'departure_time']),
    v.object({
      arrival_time: v.optional(utils.timeStamp),
      avoid: v.optional(utils.pipedArrayOf(v.oneOf([
        'tolls', 'highways', 'ferries', 'indoor'
      ]))),
      departure_time: v.optional(utils.timeStamp),
      destinations: utils.pipedArrayOf(utils.latLng),
      mode: v.optional(v.oneOf(['driving', 'walking', 'bicycling', 'transit'])),
      retryOptions: v.optional(utils.retryOptions),
      transit_mode: v.optional(utils.pipedArrayOf(v.oneOf[
        'bus', 'subway', 'train', 'tram', 'rail'
      ])),
      origins: utils.pipedArrayOf(utils.latLng)
    })
  ])
};
