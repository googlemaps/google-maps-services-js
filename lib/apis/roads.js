var utils = require('../internal/convert');
var v = require('../internal/validate');

exports.snapToRoads = {
  url: 'https://roads.googleapis.com/v1/snapToRoads',
  supportsClientId: false,
  validator: v.object({
    path: utils.pipedArrayOf(utils.latLng),
    interpolate: v.optional(v.boolean)
  })
};

exports.speedLimits = {
  url: 'https://roads.googleapis.com/v1/speedLimits',
  supportsClientId: false,
  validator: v.object({
    placeId: v.array(v.string),
    interpolate: v.optional(v.boolean)
  })
};

exports.snappedSpeedLimits = {
  url: 'https://roads.googleapis.com/v1/speedLimits',
  supportsClientId: false,
  validator: v.object({
    path: utils.pipedArrayOf(utils.latLng)
  })
};
