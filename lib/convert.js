
exports.components = (arg) =>
  Object.keys(arg).sort().map((key) => key + ':' + arg[key]).join('|');

exports.latLng = (arg) => {
  if (arg.lat != undefined && arg.lng != undefined) {
    arg = [arg.lat, arg.lng];
  }
  if (arg.latitude != undefined && arg.longitude != undefined) {
    arg = [arg.latitude, arg.longitude];
  }
  if (Array.isArray(arg)) {
    arg = arg.join(',');
  }
  return arg;
};

exports.bounds = (arg) => {
  if (!arg.southwest && !arg.northwest) {
    throw 'Expected object with northwest and southwest properties';
  }
  return exports.latLng(arg.southwest) + '|' + exports.latLng(arg.northwest);
};

exports.piped = (arg) =>
  Array.isArray(arg) ? arg.join('|') : arg;
