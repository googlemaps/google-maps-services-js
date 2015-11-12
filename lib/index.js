
exports.init = (key, makeUrlRequest) => {
  if (!key || key.indexOf('AIza') != 0) {
    throw 'Missing or invalid API key';
  }

  makeUrlRequest = makeUrlRequest || require('./make-url-request');

  var url = require('url');
  var attempt = require('./attempt').inject(setTimeout).attempt;

  /**
   * Makes an API request using the injected makeUrlRequest.
   *
   * Inserts the API key into the query parameters. Retries requests when the
   * status code requires it. Parses the response body as JSON.
   *
   * The callback is given either an error or a response. The response is an
   * object with the following entries:
   * {
   *   status: number,
   *   headers: Object,
   *   body: string,
   *   json: Object
   * }
   *
   * @param {string} path
   * @param {Object} query This function mutates the query object.
   * @param {Function} callback
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
