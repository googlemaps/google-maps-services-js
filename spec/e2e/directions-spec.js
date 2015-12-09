var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;

describe('directions client library', function() {
  var googleMaps = require('./service');

  var inOneHour = new Date().getTime() + 60 * 60 * 1000;

  function expectOK(response) {
    // if (response.status !== 200) {
    //   console.log(JSON.stringify(response, null, 2));
    // }
    expect(response.status).toBe(200);
    expect(response.json.status).toBe('OK');
    return response;
  }

  it('gets the directions from the Sydney Town Hall to Parramatta, NSW', function(done) {
    googleMaps.directions({
      origin: 'Town Hall, Sydney, NSW',
      destination: 'Parramatta, NSW',
    })
    .asPromise()
    .then(expectOK)
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

  it('accepts localization options', function(done) {
    googleMaps.directions({
      origin: 'Town Hall, Sydney, NSW',
      destination: 'Parramatta, NSW',
      language: 'en',
      units: 'metric',
      region: 'au',
    })
    .asPromise()
    .then(expectOK)
    .then(done, fail);
  });

  it('accepts transit options', function(done) {
    googleMaps.directions({
      origin: 'Town Hall, Sydney, NSW',
      destination: 'Parramatta, NSW',
      arrival_time: inOneHour,
      mode: 'transit',
      alternatives: true,
      transit_mode: ['bus', 'rail'],
      transit_routing_preference: 'fewer_transfers',
    })
    .asPromise()
    .then(expectOK)
    .then(done, fail);
  });

  it('accepts driving options', function(done) {
    googleMaps.directions({
      origin: 'Town Hall, Sydney, NSW',
      destination: 'Parramatta, NSW',
      departure_time: inOneHour,
      mode: 'driving',
      waypoints: 'Strathfield, NSW',
      alternatives: true,
      avoid: ['tolls', 'ferries'],
      traffic_model: 'best_guess',
      optimize: true,
    })
    .asPromise()
    .then(expectOK)
    .then(done, fail);
  });

});
