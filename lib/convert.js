
exports.components = function(arg) {
  return exports.piped(Object.keys(arg).sort().map(function(key) {
    return key + ':' + arg[key];
  }));
};

exports.latLng = function(arg) {
  if (arg.lat != undefined && arg.lng != undefined) arg = [arg.lat, arg.lng];
  if (arg.latitude != undefined && arg.longitude != undefined) arg = [arg.latitude, arg.longitude];
  if (Array.isArray(arg)) arg = arg.join(',');
  return arg;
};

exports.bounds = function(arg) {
  if (!arg.southwest && !arg.northwest) {
    throw 'Expected object with northwest and southwest properties';
  }
  return exports.latLng(arg.southwest) + '|' + exports.latLng(arg.northwest);
};

exports.piped = function(arg) {
  if (Array.isArray(arg)) arg = arg.join('|');
  return arg;
};
