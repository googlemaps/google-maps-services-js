var apiKey = process.env.GOOGLE_MAPS_API_KEY;

describe('geocode client library', () => {
  var googleMaps;
  beforeEach(() => {
    googleMaps = require('../../lib/index').init(apiKey);
  });

  it('gets the coordinates for the Sydney Opera House', (done) => {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    }, (err, response) => {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
            })
          ]));
      done();
    });
  }, 5000);

  it('reverse geocodes the coordinates for the Sydney Opera House', (done) => {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    }, (err, response) => {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              formatted_address: '2A Macquarie St, Sydney NSW 2000, Australia'
            })
          ]));
      done();
    });
  }, 5000);
});
