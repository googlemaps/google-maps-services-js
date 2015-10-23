var https = require('https');
var url = require('url');

exports.init = function(apiKey) {

  return function(request, callback) {
    return https.get({
      hostname: 'maps.googleapis.com',
      path: url.format({
        pathname: '/maps/api/geocode/json',
        query: request
      })
    }, function(response) {
      var body = '';

      response.on('data', function(chunk) {
        body += chunk;
      });

      response.on('end', function() {
        var json = JSON.parse(body);
        callback(json);
      });
    });
  };

};
