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
  var clientId = options.clientId || process.env.GOOGLE_MAPS_API_CLIENT_ID;
  var clientSecret = options.clientSecret || process.env.GOOGLE_MAPS_API_CLIENT_SECRET;

  var rate = options.rate || {};
  var rateLimit = rate.limit || 10;  // 10 requests per ratePeriod.
  var ratePeriod = rate.period || 1000;  // 1 second.

  var makeUrlRequest = options.makeUrlRequest || require('./make-url-request');
  var mySetTimeout = options.setTimeout || setTimeout;
  var getTime = options.getTime || function() {return new Date().getTime();};
  var attempt = require('./attempt').inject(mySetTimeout).attempt;
  var ThrottledQueue = require('./throttled-queue').inject(mySetTimeout, getTime);
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
   *   asPromise: function(): Promise
   * }}
   */
  return function(path, query, callback) {

    var useClientId = query.supportsClientId && clientId && clientSecret;
    delete query.supportsClientId;

    var retryOptions = query.retryOptions || options.retryOptions || {};
    delete query.retryOptions;

    var timeout = query.timeout || options.timeout || 60 * 1000;
    delete query.timeout;

    if (useClientId) {
      query.client = clientId;
    } else if (key && key.indexOf('AIza') == 0) {
      query.key = key;
    } else {
      throw 'Missing either a valid API key, or a client ID and secret';
    }

    var requestUrl = url.format({
      pathname: path,
      query: query
    });

    // When using client ID, generate and append the signature param.
    if (useClientId) {
      var secret = new Buffer(clientSecret, 'base64');
      var payload = url.parse(requestUrl).path;
      var signature = new Buffer(require('crypto').createHmac('sha1', secret)
          .update(payload).digest('base64')).toString()
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      while (signature.length % 4) {
        signature += '=';
      }
      requestUrl += '&signature=' + encodeURIComponent(signature);
    }

    function rateLimitedGet() {
      return requestQueue.add(function() {
        return Task.start(function(callback) {
          return makeUrlRequest(requestUrl, callback);
        });
      });
    }

    var task = Task.start(function(raceCallback) {
      var requestTask = attempt({
        'do': rateLimitedGet,
        until: function(response) {
          return !!response
              && response.status !== 500
              && response.status !== 503
              && response.status !== 504;
        },
        interval: retryOptions.interval,
        increment: retryOptions.increment,
        jitter: retryOptions.jitter
      });

      // Race the request and the timeout.
      requestTask.thenDo(raceCallback);
      mySetTimeout(function() {
        raceCallback('timeout', null);
        requestTask.cancel();
      }, timeout);
    })
    .thenDo(function(err, response) {
      if (callback) {
        callback(err, response);
      }
      return Task.withValue(err, response);
    });

    if (options.Promise) {
      var promise = new options.Promise(function(resolve, reject) {
        task = task.thenDo(function(err, result) {
          if (err != null) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      task.asPromise = function() { return promise; };
    }
    delete task.thenDo;
    return task;
  };
};
