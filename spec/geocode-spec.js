var apiKey = null;  // TODO(step): Read key out of environment.
var fetch = require('node-fetch');
fetch.Promise = require('q').Promise;

describe('geocode client library', function() {
  var googleMaps;
  beforeEach(function() {
    googleMaps = require('../lib/index').init(apiKey, fetch);
  });

  it('gets the coordinates for the Sydney Opera House', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      expect(json.results).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
            })
          ]));
    })
    .then(null, function(e) {
      expect(e.message).toBeFalsy();
    })
    .then(done);
  });
});
