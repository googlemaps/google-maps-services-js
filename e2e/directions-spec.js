var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('directions client library', function() {
  var googleMaps = require('./service');

  it('gets the directions from the Sydney Town Hall to Parramatta, NSW', function(done) {
    googleMaps.directions({
      origin: 'Sydney Town Hall',
      destination: 'Parramatta, NSW',
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.routes).toEqual(
          arrayContaining([
            objectContaining({
              legs: arrayContaining([
                objectContaining({
                  end_address: 'Parramatta NSW, Australia'
                })
              ])
            })
          ]));
    })
    .then(done, fail);
  });

});
