
var asArray = function(arg) {
  return Array.isArray(arg) ? arg : [arg];
};

exports.components = function(arg) {
  return Object.keys(arg).sort().map(function(key) {
    return key + ':' + arg[key];
  }).join('|');
};

exports.piped = function(arg) {
  return asArray(arg).join('|');
};

exports.locations = function(arg) {
  if (Array.isArray(arg) && arg.length == 2 && typeof arg[0] == 'number' && typeof arg[1] == 'number') {
    arg = [arg];
  }
  return asArray(arg).map(exports.latLng).join('|');
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

exports.bounds = function(arg) {
  if (!arg.southwest && !arg.northwest) {
    throw 'Expected object with northwest and southwest properties';
  }
  return exports.latLng(arg.southwest) + '|' + exports.latLng(arg.northwest);
};

exports.timeStamp = function(arg) {
  if (arg == undefined) {
    arg = new Date();
  }
  if (arg.getTime) {
    arg = arg.getTime();
  }
  return arg;
};

exports.Set = function(arg) {
  var members = {};
  arg.forEach(function(member) {
    members[member] = true;
  });
  return {
    has: function(member) {
      return !!members[member];
    }
  };
};
