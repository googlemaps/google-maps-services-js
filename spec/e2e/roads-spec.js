describe('roads client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets points snapped to roads', function(done) {
    googleMaps.snapToRoads({
      path: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ]
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.snappedPoints).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              originalIndex: 0,
              placeId: 'ChIJNX9BrM0LkkYRIM-cQg265e8'
            })
          ]));
      done();
    });
  }, 5000);

  it('gets speed limits for place IDs', function(done) {
    googleMaps.speedLimits({
      placeId: [
        'ChIJ58xCoGlNFmsRUEZUbW7qABM',
        'ChIJ9RhaiGlNFmsR0IxAbW7qABM',
        'ChIJabjuhGlNFmsREIxAbW7qABM'
      ]
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.speedLimits).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              speedLimit: 60,
              units: 'KPH'
            })
          ]));
      done();
    });
  }, 5000);

  it('gets speed limits for a path', function(done) {
    googleMaps.snappedSpeedLimits({
      path: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ]
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.speedLimits).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              speedLimit: 30,
              units: 'KPH'
            })
          ]));
      done();
    });
  }, 5000);

});
