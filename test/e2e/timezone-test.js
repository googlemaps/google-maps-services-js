var expect = require('chai').expect;

describe('timezone client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the timezone for the Sydney Opera House', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json).to.have.property(
          'timeZoneId', 'Australia/Sydney');
      done();
    });
  });

});
