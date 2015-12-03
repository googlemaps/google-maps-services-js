var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('geocode client library', function() {
  var googleMaps = require('./service');

  it('gets the coordinates for the Sydney Opera House', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
            })
          ]));
    })
    .then(done, fail);
  });

  it('reverse geocodes the coordinates for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    })
    .asPromise(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              formatted_address: '2A Macquarie St, Sydney NSW 2000, Australia'
            })
          ]));
    })
    .then(done, fail);
  });
});
