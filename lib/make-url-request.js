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
 *   body: string
 * }
 *
 * @param {string} url
 * @param {Function} callback
 */
module.exports = (url, callback) => {
  https.get(url, (response) => {
    var data = '';
    response.on('data', (chunk) => {data += chunk;});
    response.on('end', () => {
      callback(null, {
        status: response.statusCode,
        headers: response.headers,
        body: data
      });
    });
  })
  .on('error', (error) => callback(error, null));
};
