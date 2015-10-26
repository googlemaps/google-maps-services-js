var https = require('https');
var url = require('url');

exports.init = function(apiKey, Promise) {

  return function(query) {
    return new Promise(function(resolve, reject) {
      var request = https.get({
        hostname: 'maps.googleapis.com',
        path: url.format({
          pathname: '/maps/api/geocode/json',
          query: query
        })
      });

      request.on('response', function(response) {
        var body = '';
        response.on('data', function(chunk) {
          body += chunk;
        });
        response.on('end', function() {
          try {
            var json = JSON.parse(body);
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      });

      request.on('error', function(e) {
        reject(e);
      });
    });
  };

};
