
exports.parseArgs = function(argv) {
  var parsed = {};
  var argv = argv || process.argv.slice(2);
  for (var i = 0; i < argv.length; i += 2) {
    var value = argv[i + 1];
    try {
      value = JSON.parse(value);
    } catch (e) {
    }
    parsed[argv[i].replace(/^-*/g, '')] = value;
  }
  return parsed;
};

exports.callback = function(error, response) {
  if (error) {
    console.log("Error:", error.message);
  } else {
    console.log(JSON.stringify(response.json, null, 4));
  }
};
