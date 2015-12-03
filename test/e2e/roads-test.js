var expect = require('chai').expect;

describe('roads client library', function() {
  this.timeout(5000);

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
      expect(err).to.equal(null);
      expect(response.json.snappedPoints[0]).to.have.property(
          'placeId', 'ChIJNX9BrM0LkkYRIM-cQg265e8');
      done();
    });
  });

  it('gets speed limits for place IDs', function(done) {
    googleMaps.speedLimits({
      placeId: [
        'ChIJ58xCoGlNFmsRUEZUbW7qABM',
        'ChIJ9RhaiGlNFmsR0IxAbW7qABM',
        'ChIJabjuhGlNFmsREIxAbW7qABM'
      ]
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.speedLimits[0]).to.deep.equal({
        placeId: 'ChIJ58xCoGlNFmsRUEZUbW7qABM',
        speedLimit: 60,
        units: 'KPH'
      });
      done();
    });
  });

  it('gets speed limits for a path', function(done) {
    googleMaps.snappedSpeedLimits({
      path: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ]
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.speedLimits[0]).to.deep.equal({
        placeId: 'ChIJNX9BrM0LkkYRIM-cQg265e8',
        speedLimit: 30,
        units: 'KPH'
      });
      done();
    });
  });

});
