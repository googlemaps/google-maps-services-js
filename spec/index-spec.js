var apiKey = process.env.GOOGLE_MAPS_API_KEY;
var Promise = require('q').Promise;

describe('index.js:', () => {
  var init, requestAndSucceed, requestAndFail;
  beforeEach(() => {
    init = require('../lib/index').init;

    requestAndSucceed = jasmine.createSpy('requestAndSucceed')
        .and.callFake((url, callback) => {
          callback(undefined, {
            status: 200,
            body: '{"hello": "world"}'
          });
        });

    requestAndFail = jasmine.createSpy('requestAndFail')
        .and.callFake((url, callback) => {
          callback(null, {status: 500});
        });
  });

  describe('parsing the body as JSON', () => {
    it('populates the response.json property', done => {
      init(apiKey, {makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'}, (err, response) => {
        expect(err).toBe(null);
        expect(response).toEqual({
          status: 200,
          body: '{"hello": "world"}',
          json: {hello: 'world'}
        });
        done();
      });
    });

    it('reports parse errors', done => {
      init(apiKey, {makeUrlRequest: (url, callback) => {
        callback(null, {status: 200, body: 'not valid JSON'});
      }})
      .geocode({address: 'Sydney Opera House'}, (err, response) => {
        expect(err).toMatch(/SyntaxError/);
        done();
      });
    });
  });

  describe('retrying failing requests', () => {
    // NOTE: The default retry timeout is quite long, so if the timeout
    // specified in retryOptions is ignored, the specs will timeout and fail.

    it('retries the requests using retryOptions given to the method', done => {
      init(apiKey, {makeUrlRequest: requestAndFail})
      .geocode({
        address: 'Sydney Opera House',
        retryOptions: {
          timeout: 50,
          interval: 5,
        }
      }, (err, response) => {
        expect(err).toMatch(/timeout/);
        done();
      });
    }, 100);

    it('retries the requests using retryOptions given to the service', done => {
      init(apiKey, {makeUrlRequest: requestAndFail, retryOptions: {
        timeout: 50,
        interval: 5,
      }})
      .geocode({address: 'Sydney Opera House'}, (err, response) => {
        expect(err).toMatch(/timeout/);
        done();
      });
    }, 100);
  });

  it('.cancel() cancels attempts', done => {
    init(apiKey, {makeUrlRequest: requestAndSucceed})
    .geocode({address: 'Sydney Opera House'}, (err, response) => {
      expect(err).toMatch(/cancelled/);
      expect(requestAndSucceed).not.toHaveBeenCalled();
      done();
    })
    .cancel();
  });

  describe('using .asPromise()', () => {
    it('delivers responses', done => {
      init(apiKey, {Promise: Promise, makeUrlRequest: requestAndSucceed})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(response => {
        expect(response).toEqual({
          status: 200,
          body: '{"hello": "world"}',
          json: {hello: 'world'}
        });
      })
      .then(done, fail);
    });

    it('delivers errors', done => {
      init(apiKey, {Promise: Promise, makeUrlRequest: (url, callback) => {
        callback('error', null);
      }})
      .geocode({address: 'Sydney Opera House'})
      .asPromise()
      .then(fail, error => {
        expect(error).toEqual('error');
        done();
      })
    });
  });
});
