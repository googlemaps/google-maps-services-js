var v = require('./validate');

var asArray = function(arg) {
  return Array.isArray(arg) ? arg : [arg];
};

exports.pipedKeyValues = function(arg) {
  return Object.keys(arg).sort().map(function(key) {
    return key + ':' + arg[key];
  }).join('|');
};

exports.locations = function(arg) {
  if (Array.isArray(arg) && arg.length == 2 && typeof arg[0] == 'number' && typeof arg[1] == 'number') {
    arg = [arg];
  }
  return asArray(arg).map(exports.latLng).join('|');
};

exports.pipedArrayOf = function(validateItem) {
  var validateArray = v.array(validateItem);
  return function(value) {
    value = validateArray(asArray(value));
    return value.join('|');
  };
};

exports.latLng = function(arg) {
  if (!arg) {
    throw new v.InvalidValueError();
  } else if (arg.lat != undefined && arg.lng != undefined) {
    arg = [arg.lat, arg.lng];
  } else if (arg.latitude != undefined && arg.longitude != undefined) {
    arg = [arg.latitude, arg.longitude];
  }
  return asArray(arg).join(',');
};

var validateBounds = v.object({
  south: v.number,
  west: v.number,
  north: v.number,
  east: v.number
});

exports.bounds = function(arg) {
  arg = validateBounds(arg);
  return arg.south + ',' + arg.west + '|' + arg.north + ',' + arg.east;
};

exports.timeStamp = function(arg) {
  if (arg == undefined) {
    arg = new Date();
  }
  if (arg.getTime) {
    arg = arg.getTime();
  }
  // NOTE: Unix time is seconds past epoch.
  return Math.round(arg / 1000);
};

exports.retryOptions = v.object({
  timeout: v.optional(v.number),
  interval: v.optional(v.number),
  increment: v.optional(v.number),
  jitter: v.optional(v.number)
});
