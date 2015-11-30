var utils = require('../utils');
var v = require('../validate');

exports.elevation = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    locations: utils.pipedArrayOf(utils.latLng)
  })
};

exports.elevationAlongPath = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    path: function(path) {
      if (typeof path == 'string') {
        return 'enc:' + path;
      } else {
        return utils.pipedArrayOf(utils.latLng)(path);
      }
    },
    samples: v.number
  })
};
