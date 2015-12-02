describe('elevation client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the elevation for the Sydney Opera House', function(done) {
    googleMaps.elevation({
      locations: {lat: -33.8571965, lng: 151.2151398}
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              elevation: 16.57956886291504
            })
          ]));
      done();
    });
  }, 5000);

  it('gets the elevation for a path', function(done) {
    googleMaps.elevationAlongPath({
      path: [[40.714728, -73.998672], [-34.397, 150.644]],
      samples: 5
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              elevation: 8.883694648742676
            }),
            jasmine.objectContaining({
              elevation: -1550.868286132812
            })
          ]));
      done();
    });
  }, 5000);

});
