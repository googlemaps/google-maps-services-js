var apiKey = process.env.GOOGLE_MAPS_API_KEY;
var fetch = require('node-fetch');
fetch.Promise = require('q').Promise;

describe('geocode client library', () => {
  var googleMaps;
  beforeEach(() => {
    googleMaps = require('../lib/index').init(apiKey, fetch);
  });

  it('gets the coordinates for the Sydney Opera House', (done) => {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    })
    .then((response) => response.json())
    .then((json) => {
      expect(json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
            })
          ]));
    })
    .then(null, (e) => {
      expect(e.message).toBeFalsy();
    })
    .then(done);
  });

  it('reverse geocodes the coordinates for the Sydney Opera House', (done) => {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    })
    .then((response) => response.json())
    .then((json) => {
      expect(json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              formatted_address: '2A Macquarie St, Sydney NSW 2000, Australia'
            })
          ]));
    })
    .then(null, (e) => {
      expect(e.message).toBeFalsy();
    })
    .then(done);
  });

});
