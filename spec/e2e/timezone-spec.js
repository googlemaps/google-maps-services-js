var apiKey = process.env.GOOGLE_MAPS_API_KEY;

describe('timezone client library', () => {
  var googleMaps;
  beforeEach(() => {
    googleMaps = require('../../lib/index').init(apiKey);
  });

  it('gets the timezone for the Sydney Opera House', (done) => {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
    }, (err, response) => {
      expect(err).toBe(null);
      expect(response.json).toEqual(
          jasmine.objectContaining({
            timeZoneId : 'Australia/Sydney'
          }));
      done();
    });
  }, 5000);

});
