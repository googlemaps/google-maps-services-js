/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var url = require('url');
var Task = require('./task');

exports.inject = function(options) {

  var key = options.key || process.env.GOOGLE_MAPS_API_KEY;
  var channel = options.channel;
  var clientId = options.clientId || process.env.GOOGLE_MAPS_API_CLIENT_ID;
  var clientSecret = options.clientSecret || process.env.GOOGLE_MAPS_API_CLIENT_SECRET;

  var rate = options.rate || {};
  var rateLimit = rate.limit || 10;  // 10 requests per ratePeriod.
  var ratePeriod = rate.period || 1000;  // 1 second.

  var makeUrlRequest = options.makeUrlRequest || require('./make-url-request');
  var mySetTimeout = options.setTimeout || setTimeout;
  var myClearTimeout = options.clearTimeout || clearTimeout;
  var getTime = options.getTime || function() {return new Date().getTime();};
  var wait = require('./wait').inject(mySetTimeout, myClearTimeout);
  var attempt = require('./attempt').inject(wait).attempt;
  var ThrottledQueue = require('./throttled-queue').inject(wait, getTime);
  var requestQueue = ThrottledQueue.create(rateLimit, ratePeriod);

  /**
   * Makes an API request using the injected makeUrlRequest.
   *
   * Inserts the API key (or client ID and signature) into the query
   * parameters. Retries requests when the status code requires it.
   * Parses the response body as JSON.
   *
   * The callback is given either an error or a response. The response
   * is an object with the following entries:
   * {
   *   status: number,
   *   body: string,
   *   json: Object
   * }
   *
   * @param {string} path
   * @param {Object} query This function mutates the query object.
   * @param {Function} callback
   * @return {{
   *   cancel: function(),
   *   finally: function(function()),
   *   asPromise: function(): Promise
   * }}
   */
  return function(path, query, callback) {

    callback = callback || function() {};

    var retryOptions = query.retryOptions || options.retryOptions || {};
    delete query.retryOptions;

    var timeout = query.timeout || options.timeout || 60 * 1000;
    delete query.timeout;

    var useClientId = query.supportsClientId && clientId && clientSecret;
    delete query.supportsClientId;

    var method = query.method;
    delete query.method;

    var isPost = method == 'POST'
    var postData = isPost ? query : null;
    var requestUrl = formatRequestUrl(path, query, method, useClientId);

    function rateLimitedGet() {
      return requestQueue.add(function() {
        return Task.start(function(resolve, reject) {
          return makeUrlRequest(requestUrl, resolve, reject, postData);
        });
      });
    }

    var timeoutTask = wait(timeout).thenDo(function() {
      throw 'timeout';
    });
    var requestTask = attempt({
      'do': rateLimitedGet,
      until: function(response) {
        return !(
            response == null
            || response.status === 403  // Geolocation API only.
            || response.status === 500
            || response.status === 503
            || response.status === 504
            || response.json && response.json.status === 'OVER_QUERY_LIMIT');
      },
      interval: retryOptions.interval,
      increment: retryOptions.increment,
      jitter: retryOptions.jitter
    });

    // This function determines whether a response indicates success.
    // All APIs' JSON responses contain a 'status' field which we use
    // to determine if the response is successful, apart from the
    // Geolocation API which uses HTTP POST for its request, and HTTP
    // status codes for determining success.
    var isSuccessResponse = function(response) {
      if (!isPost) {
        return response.status === 200 && (
                  response.json.status === 'OK' ||
                  response.json.status === 'ZERO_RESULTS');
      } else {
        return response.status === 200 || response.status === 404;
      }
    };

    var task =
        Task.race([timeoutTask, requestTask])
        .thenDo(function(response) {
          if (isSuccessResponse(response)) {
            return Task.withValue(response);
          } else {
            return Task.withError(response);
          }
        })
        .thenDo(
            function(response) { callback(null, response); },
            function(err) { callback(err); });

    if (options.Promise) {
      var originalCallback = callback;
      var promise = new options.Promise(function(resolve, reject) {
        callback = function(err, result) {
          if (err != null) {
            reject(err);
          } else {
            resolve(result);
          }
          originalCallback(err, result);
        };
      });
      task.asPromise = function() { return promise; };
    }

    delete task.thenDo;
    return task;
  };

  /**
   * Adds auth information to the query, and formats it into a URL.
   * @param {string} path
   * @param {Object} query
   * @param {boolean} useClientId
   * @return {string} The formatted URL.
   */
  function formatRequestUrl(path, query, method, useClientId) {
    if (channel) {
      query.channel = channel;
    }
    if (useClientId) {
      query.client = clientId;
    } else if (key && key.indexOf('AIza') == 0) {
      query.key = key;
    } else {
      throw 'Missing either a valid API key, or a client ID and secret';
    }

    var isPost = method == 'POST';
    var requestUrl = url.format({
      pathname: path,
      query: isPost ? {key: query.key} : query
    });
    if (isPost) {
      // Remove key from query for HTTP POST, since query is the JSON being posted.
      delete query.key;
    }

    // When using client ID, generate and append the signature param.
    if (useClientId) {
      var secret = new Buffer(clientSecret, 'base64');
      var payload = url.parse(requestUrl).path;
      var signature = computeSignature(secret, payload);
      requestUrl += '&signature=' + encodeURIComponent(signature);
    }

    return requestUrl;
  }

  /**
   * @param {string} secret
   * @param {string} payload
   * @return {string}
   */
  function computeSignature(secret, payload) {
    var signature =
        new Buffer(
            require('crypto')
            .createHmac('sha1', secret)
            .update(payload)
            .digest('base64'))
        .toString()
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    while (signature.length % 4) {
      signature += '=';
    }
    return signature;
  }

};
