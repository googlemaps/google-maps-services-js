var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('elevation client library', function() {
  var googleMaps = require('./service');

  it('gets the elevation for the Sydney Opera House', function(done) {
    googleMaps.elevation({
      locations: {lat: -33.8571965, lng: 151.2151398}
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              elevation: 16.57956886291504
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets the elevation for a path', function(done) {
    googleMaps.elevationAlongPath({
      path: [[40.714728, -73.998672], [-34.397, 150.644]],
      samples: 5
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              elevation: 8.883694648742676
            }),
            objectContaining({
              elevation: -1550.868286132812
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets the elevation for an encoded polyline', function(done) {
    googleMaps.elevationAlongPath({
      path: 'v}kmEyetx[h@nAcAlBWl@Sd@Ol@Mb@OBIBEAQ?qAPiATu@NC?ABm@^GBE@m@DD]DS',
      samples: 5
    })
    .asPromise()
    .then(function(response) {
      expect(response.status).toBe(200);
      expect(response.json.status).toBe('OK');
    })
    .then(done, fail);
  });

});
