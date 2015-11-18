var apiKey = process.env.GOOGLE_MAPS_API_KEY;

describe('directions client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../../lib/index').init(apiKey);
  });

  it('gets the directions from the Sydney Town Hall to Parramatta, NSW', function(done) {
    googleMaps.directions({
      origin: 'Sydney Town Hall',
      destination: 'Parramatta, NSW',
    }, function(err, response) {
      expect(err).toBe(null);
      expect(response.json.routes).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              legs: jasmine.arrayContaining([
                jasmine.objectContaining({
                  end_address: 'Parramatta NSW, Australia'
                })
              ])
            })
          ]));
      done();
    });
  }, 5000);

});
