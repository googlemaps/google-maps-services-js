var url = require('url');
var https = require('https');

exports.init = function(key, requester) {

  if (key && key.indexOf('AIza') != 0) throw 'Invalid API key';

  var _requester = function(path, query, callback) {

    callback = callback || function() {}
    query = query || {};
    if (key) query.key = key;

    requester = requester || function(url) {
      return https.get(url, function(response) {
        var data = '';
        response.on('data', function(chunk) {
          data += chunk;
        });
        response.on('end', function() {
          callback(null, JSON.parse(data));
        });
      }).on('error', function(error) {
        callback(error, null);
      }).end();
    };

    return requester(url.format({
      pathname: 'https://maps.googleapis.com' + path,
      query: query
    }));

  };

  return {
    geocode: require('./geocode').inject(_requester).geocode
  };

};
