var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.use(require('sinon-chai'));

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

    requestAndSucceed = sinon.spy(function(url, callback) {
      requestTimes.push(theTime);
      callback(undefined, {
        status: 200,
        json: {'hello': 'world'}
      });
    });

    requestAndFail = sinon.spy(function(url, callback) {
      requestTimes.push(theTime);
      callback(null, {status: 500});
    });
  });

  describe('parsing the body as JSON', function() {
    it('populates the response.json property', function(done) {
      init({makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).to.equal(null);
        expect(response).to.deep.equal({
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
      init({
        clientId: query.client,
        clientSecret: 'a2V5',
        makeUrlRequest: function(url) {
          expect(url).to.equal(expected);
          done();
        }
      })
      .geocode({address: query.address});
    });
  });

  describe('retrying failing requests', function() {
    it('uses retryOptions given to the method', function(done) {
      theTime = 0;
      init({
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
        expect(err).to.deep.equal(new Error('timeout'));
        expect(requestTimes).to.deep.equal([0, 1000, 2000, 3000, 4000, 5000]);
        done();
      });
    });

    it('uses retryOptions given to the service', function(done) {
      theTime = 0;
      init({
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
        expect(err).to.deep.equal(new Error('timeout'));
        expect(requestTimes).to.deep.equal([0, 1000, 2000, 3000, 4000, 5000]);
        done();
      });
    });
  });

  describe('throttling', function() {
    it('spaces out requests made too close', function(done) {
      theTime = 0;
      var googleMaps = init({
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
        expect(requestTimes).to.deep.equal([0, 0, 0, 1000]);
        done();
      });
    });

    it('sends requests ASAP when not bunched up', function(done) {
      theTime = 0;
      var googleMaps = init({
        makeUrlRequest: requestAndSucceed,
        rate: {period: 1000},
        setTimeout: fakeSetTimeout,
        getTime: function() {
          return theTime;
        }
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).to.equal(null);

        theTime = 1000;
        googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
          expect(err).to.equal(null);
          expect(requestTimes).to.deep.equal([0, 1000]);
          done();
        });
      });
    });
  });

  describe('.cancel()', function() {
    it('cancels when called immediately', function(done) {
      init({makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).to.deep.equal(new Error('cancelled'));
        expect(requestAndSucceed).not.to.have.been.called;
        done();
      })
      .cancel();
    });

    it('cancels throttled requests', function(done) {
      var googleMaps = init({
        makeUrlRequest: requestAndSucceed,
        rate: {limit: 1}
      });

      googleMaps.geocode({address: 'Sydney Opera House'}, function(err, response) {
        expect(err).to.equal(null);
        expect(requestAndSucceed).to.have.been.called;
        // At this point, the second request should already have been enqueued,
        // due to throttling.
        handle.cancel();
      });

      var handle = googleMaps.geocode(
        {address: 'Sydney Opera House'},
        function(err, response) {
          expect(err).to.deep.equal(new Error('cancelled'));
          expect(requestAndSucceed.callCount).to.equal(1);
          done();
        }
      );
    });

    it('cancels requests waiting to be retried', function(done) {
      var handle = init({makeUrlRequest: requestAndFailThenCancel})
          .geocode({address: 'Sydney Opera House'}, function(err, response) {
            expect(err).to.deep.equal(new Error('cancelled'));
            expect(requestAndFail).to.have.been.called;
            done();
          });

      function requestAndFailThenCancel(url, callback) {
        requestAndFail(url, callback);
        // After the first failure, schedule a cancel.
        setImmediate(function() {
          handle.cancel();
        });
      }
    });

    it('doesn\'t cancel in-flight requests', function(done) {
      var handle =
          init({makeUrlRequest: function(url, callback) {
            setTimeout(function() {
              requestAndSucceed(url, callback);
            }, 10);
            // By this stage, the request is in-flight, and cannot be cancelled.
            handle.cancel();
          }})
          .geocode({address: 'Sydney Opera House'}, function(err, response) {
            expect(err).to.equal(null);
            done();
          });
    });
  });

  describe('using .asPromise()', function() {
    it('delivers responses', function() {
      return (
          init({Promise: Promise, makeUrlRequest: requestAndSucceed})
          .geocode({address: 'Sydney Opera House'})
          .asPromise()
          .then(function(response) {
            expect(response).to.deep.equal({
              status: 200,
              json: {'hello': 'world'}
            });
          }));
    });

    it('delivers errors', function() {
      return (
          init({Promise: Promise, makeUrlRequest: function(url, callback) {
            callback('error', null);
          }})
          .geocode({address: 'Sydney Opera House'})
          .asPromise()
          .then(expect.fail, function(error) {
            expect(error).to.deep.equal('error');
          }));
    });
  });
});
