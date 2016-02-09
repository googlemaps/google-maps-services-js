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

var Promise = require('q').Promise;

describe('index.js:', function() {
  var theTime;
  var fakeSetTimeout = function(callback, duration) {
    setImmediate(function() {
      theTime += duration;
      callback();
    });
  };

  var createClient, requestAndSucceed, requestAndFail, requestTimes;
  beforeEach(function() {
    theTime = 1000000;
    requestTimes = [];

    createClient = require('../../lib/index').createClient;

    requestAndSucceed = jasmine.createSpy('requestAndSucceed')
        .and.callFake(function(url, callback) {
          requestTimes.push(theTime);
          callback(undefined, {
            status: 200,
            json: {'hello': 'world'}
          });
        });

    requestAndFail = jasmine.createSpy('requestAndFail')
        .and.callFake(function(url, callback) {
          requestTimes.push(theTime);
          callback(null, {status: 500});
        });
  });

  describe('parsing the body as JSON', function() {
    it('populates the response.json property', function(done) {
      createClient({makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({
          status: 200,
          json: {'hello': 'world'}
        });
        done();
      });
    });

  });

  describe('using a client ID and secret', function() {
    it('generates a signature param', function(done) {
      var query = {
        address: 'Sesame St.',
        client: 'foo',
        signature: 'Wqh6_J7zAuZHQOQgHwOehx4Wr6g='
      };
      var expected = require('url').format({
        pathname: 'https://maps.googleapis.com/maps/api/geocode/json',
        query: query
      });
      createClient({
        clientId: query.client,
        clientSecret: 'a2V5',
        makeUrlRequest: function(url) {
          expect(url).toBe(expected);
          done();
        }
      })
      .geocode({address: query.address});
    });
  });

  describe('retrying failing requests', function() {
    it('uses retryOptions given to the method', function(done) {
      theTime = 0;
      createClient({
        makeUrlRequest: requestAndFail,
        setTimeout: fakeSetTimeout,
        getTime: function() {
          return theTime;
        }
      })
      .geocode({
        address: 'Sydney Opera House',
        retryOptions: {
          timeout: 5500,
          interval: 1000,
          increment: 1,
          jitter: 1e-100
        }
      }, function(err, response) {
        expect(err).toMatch(/timeout/);
        expect(requestTimes).toEqual([0, 1000, 2000, 3000, 4000, 5000]);
        done();
      });
    });

    it('uses retryOptions given to the service', function(done) {
      theTime = 0;
      createClient({
        makeUrlRequest: requestAndFail,
        retryOptions: {
          timeout: 5500,
          interval: 1000,
          increment: 1,
          jitter: 1e-100
        },
        setTimeout: fakeSetTimeout,
        getTime: function() {
          return theTime;
        }
      })
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toMatch(/timeout/);
        expect(requestTimes).toEqual([0, 1000, 2000, 3000, 4000, 5000]);
        done();
      });
    });
  });

  describe('throttling', function() {
    it('spaces out requests made too close', function(done) {
      theTime = 0;
      var googleMaps = createClient({
        makeUrlRequest: requestAndSucceed,
        rate: {limit: 3, period: 1000},
        setTimeout: fakeSetTimeout,
        getTime: function() {
          return theTime;
        }
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {
        expect(requestTimes).toEqual([0, 0, 0, 1000]);
        done();
      });
    });

    it('sends requests ASAP when not bunched up', function(done) {
      theTime = 0;
      var googleMaps = createClient({
        makeUrlRequest: requestAndSucceed,
        rate: {period: 1000},
        setTimeout: fakeSetTimeout,
        getTime: function() {
          return theTime;
        }
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toBe(null);

        theTime = 1000;
        googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
          expect(err).toBe(null);
          expect(requestTimes).toEqual([0, 1000]);
          done();
        });
      });
    });
  });

  describe('.cancel()', function() {
    it('cancels when called immediately', function(done) {
      createClient({makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toMatch(/cancelled/);
        expect(requestAndSucceed).not.toHaveBeenCalled();
        done();
      })
      .cancel();
    });

    it('cancels throttled requests', function(done) {
      var googleMaps = createClient({
        makeUrlRequest: requestAndSucceed,
        rate: {limit: 1}
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toBe(null);
        expect(requestAndSucceed).toHaveBeenCalled();
        // At this point, the second request should already have been enqueued,
        // due to throttling.
        handle.cancel();
      });

      var handle = googleMaps.geocode(
        {address: 'Sydney Opera House'},
        function(err, response) {
          expect(err).toMatch(/cancelled/);
          expect(requestAndSucceed.calls.count()).toBe(1);
          done();
        }
      );
    });

    it('cancels requests waiting to be retried', function(done) {
      var handle = createClient({makeUrlRequest: requestAndFail})
          .geocode({address: 'Sydney Opera House'}, function(err, response) {
            expect(err).toMatch(/cancelled/);
            expect(requestAndFail).toHaveBeenCalled();
            done();
          });

      requestAndFail.and.callFake(function(url, callback) {
        callback(null, {status: 500});
        // After the first failure, schedule a cancel.
        setImmediate(function() {
          handle.cancel();
        });
      });
    });

    it('cancels in-flight requests', function(done) {
      var handle =
          createClient({makeUrlRequest: function(url, callback) {
            setTimeout(function() {
              requestAndSucceed(url, callback);
            }, 10);
            // By this stage, the request is in-flight.
            handle.cancel();
          }})
          .geocode({address: 'Sydney Opera House'}, function(err, response) {
            expect(err).toBe('cancelled');
            done();
          });
    });
  });

  describe('using .asPromise()', function() {
    it('delivers responses', function(done) {
      createClient({Promise: Promise, makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(function(response) {
        expect(response).toEqual({
          status: 200,
          json: {'hello': 'world'}
        });
      })
      .then(done, fail);
    });

    it('delivers errors', function(done) {
      createClient({Promise: Promise, makeUrlRequest: function(url, callback) {
        callback('error', null);
      }})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(fail, function(error) {
        expect(error).toEqual('error');
        done();
      })
    });

    it('throws validation errors', function() {
      expect(function() {
        createClient({Promise: Promise, makeUrlRequest: requestAndSucceed})
        .geocode({'uh-oh': 'bogus argument'})
        .asPromise()
        .then(fail);
      }).toThrowError(/uh-oh/);
    });
  });

  it('throws validation errors', function() {
    expect(function() {
      createClient({makeUrlRequest: requestAndSucceed})
      .geocode({'uh-oh': 'bogus argument'}, function(err, response) {
        fail();
      });
    }).toThrowError(/uh-oh/);
  });
});
