var objectContaining = jasmine.objectContaining;

describe('timezone client library', function() {
  var googleMaps = require('./service');

  it('gets the timezone for the Sydney Opera House', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
    })
    .asPromise()
    .then(function(response) {
      expect(response.json).toEqual(
          objectContaining({
            timeZoneId : 'Australia/Sydney'
          }));
    })
    .then(done, fail);
  });

});
