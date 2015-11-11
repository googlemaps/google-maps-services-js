var url = require('url');
var attempt = require('./attempt').inject(setTimeout).attempt;

exports.init = (key, makeUrlRequest) => {

  if (!key || key.indexOf('AIza') != 0) {
    throw 'Missing or invalid API key';
  }

  // Provide a default makeUrlRequest that uses the standard node https lib.
  // makeUrlRequest must take two arguments: a URL and a callback.
  // It must call the callback with two parameters: (err, response).
  // If there was an error, response should be null.
  // If there was no error, err should be null, and response should be an object
  // {
  //   headers: [object],
  //   body: [text],
  //   status: [number]
  // }
  if (!makeUrlRequest) {
    var https = require('https');
    makeUrlRequest = (url, callback) => {
      https.get(url, (response) => {
        var data = '';
        response.on('data', (chunk) => {data += chunk;});
        response.on('end', () => {
          callback(null, {
            headers: response.headers,
            body: data,
            status: response.statusCode,
          });
        });
      })
      .on('error', (error) => callback(error, null));
    };
  }

  /**
   * Convenience function to make API requests.
   *
   * Inserts the API key into the query parameters. Retries requests when the
   * status code requires it. Parses the response body as JSON.
   *
   * @param {string} path
   * @param {Object} query This function mutates the query object.
   * @param {function(?, {headers, status, body, json})} callback
   * @return {{
   *   cancel: function(),
   *   asPromise: function(): Promise  // TODO
   * }}
   */
  var makeApiCall = (path, query, callback) => {
    query.key = query.key || key;

    var retryOptions = query.retryOptions || {};
    delete query.retryOptions;

    var requestUrl = url.format({
      pathname: 'https://maps.googleapis.com' + path,
      query: query
    });

    var handle = attempt({
      'do': (callback) => {
        makeUrlRequest(requestUrl, callback);
      },
      until: (response) => (
        response.status !== 500
        && response.status !== 503
        && response.status !== 504
      ),
      interval: retryOptions.interval,
      increment: retryOptions.increment,
      jitter: retryOptions.jitter,
      timeout: retryOptions.timeout
    }, (err, response) => {
      if (err) {
        return callback(err, null);
      }
      try {
        response.json = JSON.parse(response.body);
      } catch (e) {
        return callback(e, null);
      }
      return callback(null, response);
    });

    return handle;
  };

  var geocode = require('./geocode').inject(makeApiCall);

  return {
    geocode: geocode.geocode,
    reverseGeocode: geocode.reverseGeocode
  };

};
