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
  if (arg.lat != undefined && arg.lng != undefined) {
    arg = [arg.lat, arg.lng];
  }
  if (arg.latitude != undefined && arg.longitude != undefined) {
    arg = [arg.latitude, arg.longitude];
  }
  return asArray(arg).join(',');
};

var validateBounds = v.object({
  southwest: exports.latLng,
  northeast: exports.latLng
});

exports.bounds = function(arg) {
  arg = validateBounds(arg);
  return arg.southwest + '|' + arg.northeast;
};

exports.timeStamp = function(arg) {
  if (arg == undefined) {
    arg = new Date();
  }
  if (arg.getTime) {
    arg = arg.getTime();
  }
  // NOTE: Unix time is seconds past epoch.
  return arg / 1000;
};

exports.retryOptions = v.object({
  timeout: v.optional(v.number),
  interval: v.optional(v.number),
  increment: v.optional(v.number),
  jitter: v.optional(v.number)
});
