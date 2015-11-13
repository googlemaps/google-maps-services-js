
var asArray = (arg) => Array.isArray(arg) ? arg : [arg];

exports.components = (arg) =>
  Object.keys(arg).sort().map((key) => key + ':' + arg[key]).join('|');

exports.piped = (arg) => asArray(arg).join('|');

exports.locations = (arg) => asArray(arg).map(exports.latLng).join('|');

exports.latLng = (arg) => {
  if (arg.lat != undefined && arg.lng != undefined) {
    arg = [arg.lat, arg.lng];
  }
  if (arg.latitude != undefined && arg.longitude != undefined) {
    arg = [arg.latitude, arg.longitude];
  }
  return asArray(arg).join(',');
};

exports.bounds = (arg) => {
  if (!arg.southwest && !arg.northwest) {
    throw 'Expected object with northwest and southwest properties';
  }
  return exports.latLng(arg.southwest) + '|' + exports.latLng(arg.northwest);
};

exports.timeStamp = (arg) => {
  if (arg == undefined) {
    arg = new Date();
  }
  if (arg.getTime) {
    arg = arg.getTime();
  }
  return arg;
};
