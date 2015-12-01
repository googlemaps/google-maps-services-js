var https = require('https');

/**
 * Makes a secure HTTP GET request for the given URL.
 *
 * Calls the callback with two parameters (err, response). If there was an
 * error, response should be null. If there was no error, err should be null,
 * and response should be an object *
 * {
 *   status: number,
 *   headers: Object,
 *   json: Object
 * }
 *
 * @param {string} url
 * @param {Function} callback
 */
module.exports = function makeUrlRequest(url, callback) {
  https.get(url, function(response) {

    response.on('error', function(error) {
      callback(error, null)
    });

    if (response.statusCode === 302) {
      // Handle redirect.
      var url = response.headers['location'];
      makeUrlRequest(url, callback)
    } else if (response.headers['content-type'] == 'application/json; charset=UTF-8') {
      // Handle JSON.
      var data = '';
      response.on('data', function(chunk) {
        data += chunk;
      });
      response.on('end', function() {
        callback(null, {
          status: response.statusCode,
          headers: response.headers,
          json: JSON.parse(data)
        })
      });
    } else {
      // Fallback is for binary data, namely places photo download,
      // so just provide the response stream.
      callback(null, response);
    }

  });
};
