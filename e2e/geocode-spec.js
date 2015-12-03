var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('geocode client library', function() {
  var googleMaps = require('./service');

  it('gets the coordinates for the Sydney Opera House', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
            })
          ]));
      done();
    });
  });

  it('reverse geocodes the coordinates for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              formatted_address: '2A Macquarie St, Sydney NSW 2000, Australia'
            })
          ]));
      done();
    });
  });
});
