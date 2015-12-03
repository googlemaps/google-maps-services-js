var expect = require('chai').expect;

describe('directions client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the directions from the Sydney Town Hall to Parramatta, NSW', function(done) {
    googleMaps.directions({
      origin: 'Sydney Town Hall',
      destination: 'Parramatta, NSW',
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.routes[0].legs[0].end_address)
          .to.equal('Parramatta NSW, Australia');
      done();
    });
  });

});
