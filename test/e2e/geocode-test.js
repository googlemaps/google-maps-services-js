var expect = require('chai').expect;

describe('geocode client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the coordinates for the Sydney Opera House', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.results[0])
          .to.have.property('place_id', 'ChIJidzEjmauEmsRwb535u6rCA4');
      done();
    });
  });

  it('reverse geocodes the coordinates for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.results[0]).to.have.property(
          'formatted_address', '2A Macquarie St, Sydney NSW 2000, Australia');
      done();
    });
  });
});
