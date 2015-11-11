var apiKey = process.env.GOOGLE_MAPS_API_KEY;

describe('index.js:', () => {
  var googleMaps, makeUrlRequest;
  beforeEach(() => {
    makeUrlRequest = jasmine.createSpy('makeUrlRequest');
    googleMaps = require('../lib/index').init(apiKey, makeUrlRequest);
  });

  it('uses the injected makeUrlRequest', done => {
    makeUrlRequest.and.callFake((url, callback) => {
      callback(undefined, {
        headers: {dummy: 'value'},
        status: 200,
        body: '{"hello": "world"}'
      });
    });

    googleMaps.geocode({address: 'Sydney Opera House'}, (err, response) => {
      expect(err).toBe(null);
      expect(response).toEqual({
        headers: {dummy: 'value'},
        status: 200,
        body: '{"hello": "world"}',
        json: {hello: 'world'}
      });
      done();
    });
  });

  it('can cancel attempts', done => {
    googleMaps.geocode({address: 'Sydney Opera House'}, (err, response) => {
      expect(err).toMatch(/cancelled/);
      expect(makeUrlRequest).not.toHaveBeenCalled();
      done();
    })
    .cancel();
  });

  it('retries the requests', done => {
    makeUrlRequest.and.callFake((url, callback) => {
      callback(null, {status: 500});
    });

    googleMaps.geocode({
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
});
