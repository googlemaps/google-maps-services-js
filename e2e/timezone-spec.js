var objectContaining = jasmine.objectContaining;

describe('timezone client library', function() {
  var googleMaps = require('./service');

  it('gets the timezone for the Sydney Opera House', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
      language: 'en'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json).toEqual(
          objectContaining({
            status: 'OK',
            rawOffset: 36000,
            dstOffset: 0,
            timeZoneId: 'Australia/Sydney'
          }));
    })
    .then(done, fail);
  });

  it('the timestamp is optional', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398]
    })
    .asPromise()
    .then(function(response) {
      expect(response.json).toEqual(
          objectContaining({
            status: 'OK',
            timeZoneId: 'Australia/Sydney'
          }));
    })
    .then(done, fail);
  });

});
