var apiKey = process.env.GOOGLE_MAPS_API_KEY;
var Promise = require('q').Promise;

describe('index.js:', function() {
  var theTime;
  var fakeSetTimeout = function(callback, duration) {
    setImmediate(function() {
      theTime += duration;
      callback();
    });
  };

  var init, requestAndSucceed, requestAndFail, requestTimes;
  beforeEach(function() {
    theTime = 1000000;
    requestTimes = [];

    init = require('../lib/index').init;

    requestAndSucceed = jasmine.createSpy('requestAndSucceed')
        .and.callFake(function(url, callback) {
          requestTimes.push(theTime);
          callback(undefined, {
            status: 200,
            body: '{"hello": "world"}'
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
      init(apiKey, {makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({
          status: 200,
          body: '{"hello": "world"}',
          json: {hello: 'world'}
        });
        done();
      });
    });

    it('reports parse errors', function(done) {
      init(apiKey, {makeUrlRequest: function(url, callback) {
        callback(null, {status: 200, body: 'not valid JSON'});
      }})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toMatch(/SyntaxError/);
        done();
      });
    });
  });

  describe('retrying failing requests', function() {
    it('uses retryOptions given to the method', function(done) {
      theTime = 0;
      init(apiKey, {
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
      init(apiKey, {
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
      var googleMaps = init(apiKey, {
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
      var googleMaps = init(apiKey, {
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
      init(apiKey, {makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).toMatch(/cancelled/);
        expect(requestAndSucceed).not.toHaveBeenCalled();
        done();
      })
      .cancel();
    });

    it('cancels throttled requests', function(done) {
      var googleMaps = init(apiKey, {
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
      var handle = init(apiKey, {makeUrlRequest: requestAndFail})
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

    it('doesn\'t cancel in-flight requests', function(done) {
      var handle =
          init(apiKey, {makeUrlRequest: function(url, callback) {
            setTimeout(function() {
              requestAndSucceed(url, callback);
            }, 10);
            // By this stage, the request is in-flight, and cannot be cancelled.
            handle.cancel();
          }})
          .geocode({address: 'Sydney Opera House'}, function(err, response) {
            expect(err).toBe(null);
            done();
          });
    });
  });

  describe('using .asPromise()', function() {
    it('delivers responses', function(done) {
      init(apiKey, {Promise: Promise, makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(function(response) {
        expect(response).toEqual({
          status: 200,
          body: '{"hello": "world"}',
          json: {hello: 'world'}
        });
      })
      .then(done, fail);
    });

    it('delivers errors', function(done) {
      init(apiKey, {Promise: Promise, makeUrlRequest: function(url, callback) {
        callback('error', null);
      }})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(fail, function(error) {
        expect(error).toEqual('error');
        done();
      })
    });
  });
});
