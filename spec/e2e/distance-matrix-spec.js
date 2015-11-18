var apiKey = process.env.GOOGLE_MAPS_API_KEY;

describe('distance matrix client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init(apiKey);
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
      expect(err).toBe(null);
      expect(response.json).toEqual(
          jasmine.objectContaining({
            destination_addresses: jasmine.arrayContaining(['Uluru NT 0872, Australia']),
            origin_addresses: jasmine.arrayContaining(['Perth WA, Australia'])
          }));
      done();
    });
  }, 5000);

});
