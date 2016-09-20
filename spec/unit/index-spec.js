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
var MockClock = require('../mock-clock');
var parse = require('url').parse;

describe('index.js:', function() {
  var createClient, requestAndSucceed, requestAndFail, requestTimes, clock;
  beforeEach(function() {
    clock = MockClock.create();
    createClient = require('../../lib/index').createClient;

    requestTimes = [];

    requestAndSucceed = jasmine.createSpy('requestAndSucceed')
        .and.callFake(function(url, onSuccess) {
          requestTimes.push(clock.getTime());
          onSuccess({
            status: 200,
            json: {'hello': 'world'}
          });
        });

    requestAndFail = jasmine.createSpy('requestAndFail')
        .and.callFake(function(url, onSuccess) {
          requestTimes.push(clock.getTime());
          onSuccess({status: 500});
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
      createClient({
        clientId: 'foo',
        clientSecret: 'a2V5',
        makeUrlRequest: function(url) {
          expect(parse(url, true).query.signature)
          .toBe('Wqh6_J7zAuZHQOQgHwOehx4Wr6g=');
          done();
        }
      })
      .geocode({address: 'Sesame St.'});
    });

    it('includes the channel if specified', function(done) {
      createClient({
        clientId: 'foo',
        clientSecret: 'a2V5',
        channel: 'bar',
        makeUrlRequest: function(url) {
          expect(parse(url, true).query.channel)
          .toBe('bar');
          done();
        }
      })
      .geocode({address: 'Sesame St.'});
    });
  });

  describe('retrying failing requests', function() {
    it('uses retryOptions given to the method', function(done) {
      createClient({
        makeUrlRequest: requestAndFail,
        getTime: clock.getTime,
        setTimeout: clock.setTimeout,
        clearTimeout: clock.clearTimeout
      })
      .geocode({
        address: 'Sydney Opera House',
        timeout: 100,
        retryOptions: {
          interval: 30,
          increment: 1,
          jitter: 1e-100
        }
      }, function(err, response) {
        expect(err).toMatch(/timeout/);
        expect(requestTimes).toEqual([0, 30, 60, 90]);
        done();
      });

      clock.run();
    });

    it('uses retryOptions given to the service', function(done) {
      createClient({
        makeUrlRequest: requestAndFail,
        getTime: clock.getTime,
        setTimeout: clock.setTimeout,
        clearTimeout: clock.clearTimeout,
        timeout: 100,
        retryOptions: {
          interval: 30,
          increment: 1,
          jitter: 1e-100
        }
      })
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toMatch(/timeout/);
        expect(requestTimes).toEqual([0, 30, 60, 90]);
        done();
      });

      clock.run();
    });
  });

  describe('throttling', function() {
    it('spaces out requests made too close', function(done) {
      var googleMaps = createClient({
        makeUrlRequest: requestAndSucceed,
        getTime: clock.getTime,
        setTimeout: clock.setTimeout,
        clearTimeout: clock.clearTimeout,
        rate: {limit: 3, period: 30}
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {});
      googleMaps.geocode({address: 'Sydney Opera House'}, function() {
        expect(requestTimes).toEqual([0, 0, 0, 30]);
        done();
      });

      clock.run();
    });

    it('sends requests ASAP when not bunched up', function(done) {
      var googleMaps = createClient({
        makeUrlRequest: requestAndSucceed,
        getTime: clock.getTime,
        setTimeout: clock.setTimeout,
        clearTimeout: clock.clearTimeout,
        rate: {period: 20}
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toBe(null);
      });

      clock.run(30)
      .thenDo(function() {
        googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
          expect(err).toBe(null);
          expect(requestTimes).toEqual([0, 30]);
          done();
        });
      })
      .thenDo(function() {
        return clock.run();
      });
    });
  });

  describe('.cancel()', function() {
    it('cancels when called immediately', function(done) {
      var handle = createClient({makeUrlRequest: requestAndSucceed})
          .geocode({address: 'Sydney Opera House'}, fail)
          .finally(function() {
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

      var handle =
          googleMaps.geocode({address: 'Sydney Opera House'}, fail)
          .finally(function() {
            expect(requestAndSucceed.calls.count()).toBe(1);
            done();
          });
    });

    it('cancels requests waiting to be retried', function(done) {
      var handle = createClient({makeUrlRequest: requestAndFail})
          .geocode({address: 'Sydney Opera House'}, fail)
          .finally(function() {
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
          createClient({makeUrlRequest: function(url, onSuccess) {
            setTimeout(function() {
              requestAndSucceed(url, onSuccess);
            }, 10);
            // By this stage, the request is in-flight.
            handle.cancel();
          }})
          .geocode({address: 'Sydney Opera House'}, fail)
          .finally(done)
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
      createClient({
        Promise: Promise,
        makeUrlRequest: function(url, onSuccess, onError) {
          onError('error');
        }
      })
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
