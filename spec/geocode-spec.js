var apiKey = null;  // TODO(step): Read key out of environment.
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
    .then(done, fail);
  }, 5000);

  xit('reverse geocodes the coordinates for the Sydney Opera House', (done) => {
    googleMaps.reverseGeocode({
      latlng: [-33.8674869, 151.2069902]
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
    .then(done, fail);
  }, 5000);

});
