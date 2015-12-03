var expect = require('chai').expect;

describe('elevation client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the elevation for the Sydney Opera House', function(done) {
    googleMaps.elevation({
      locations: {lat: -33.8571965, lng: 151.2151398}
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.results[0].elevation).to.be.closeTo(17, 1);
      done();
    });
  });

  it('gets the elevation for a path', function(done) {
    googleMaps.elevationAlongPath({
      path: [[40.714728, -73.998672], [-34.397, 150.644]],
      samples: 5
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.results[0].elevation).to.be.closeTo(9, 1);
      expect(response.json.results[1].elevation).to.be.closeTo(-1551, 1);
      done();
    });
  });

});
