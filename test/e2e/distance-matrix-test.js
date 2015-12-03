var expect = require('chai').expect;

describe('distance matrix client library', function() {
  this.timeout(5000);

  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init();
  });

  it('gets the distance matrix for Sydney Town Hall to Parramatta, NSW', function(done) {
    googleMaps.distanceMatrix({
      origins: [
        'Perth, Australia', 'Sydney, Australia', 'Melbourne, Australia',
        'Adelaide, Australia', 'Brisbane, Australia', 'Darwin, Australia',
        'Hobart, Australia', 'Canberra, Australia'
      ],
      destinations: [
        'Uluru, Australia', 'Kakadu, Australia', 'Blue Mountains, Australia',
        'Bungle Bungles, Australia', 'The Pinnacles, Australia'
      ]
    }, function(err, response) {
      expect(err).to.equal(null);
      expect(response.json.destination_addresses)
          .to.contain('Uluru NT 0872, Australia');
      expect(response.json.origin_addresses)
          .to.contain('Perth WA, Australia');
      done();
    });
  }, 5000);

});
