describe('timezone client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the timezone for the Sydney Opera House', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json).toEqual(
          jasmine.objectContaining({
            timeZoneId : 'Australia/Sydney'
          }));
      done();
    });
  }, 5000);

});
