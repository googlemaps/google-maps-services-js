var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;
var stringMatching = jasmine.stringMatching;

var googleMaps = require('./service');

function expectOK(response) {
  expect(response.status).toBe(200);
  expect(response.json.status).toBe('OK');
  return response;
}

describe('geocode client library', function() {
  function expectOperaHouse(response) {
    expect(response.json.results)
    .toEqual(arrayContaining([
      objectContaining({
        place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
      })
    ]));
    return response;
  }

  it('gets the coordinates for the Sydney Opera House', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House'
    })
    .asPromise()
    .then(expectOK)
    .then(expectOperaHouse)
    .then(done, fail);
  });

  it('accepts components filters', function(done) {
    googleMaps.geocode({
      address: 'Opera House',
      components: {
        locality: 'Sydney'
      },
      bounds: {south: -33.9, west: 151.2, north: -33.8, east: 151.3}
    })
    .asPromise()
    .then(expectOK)
    .then(expectOperaHouse)
    .then(done, fail);
  });

  it('accepts localization options', function(done) {
    googleMaps.geocode({
      address: 'Sydney Opera House',
      region: 'au',
      language: 'en'
    })
    .asPromise()
    .then(expectOK)
    .then(expectOperaHouse)
    .then(done, fail);
  });

  it('handles components without address', function(done) {
    googleMaps.geocode({
      components: {
        route: 'Macquarie St',
        locality: 'Sydney',
        postal_code: '2000',
        country: 'Australia'
      }
    })
    .asPromise()
    .then(expectOK)
    .then(done, fail);
  });
});

describe('reverse geocode client library', function() {
  function expect2aMacquarieStreet(response) {
    expect(response.json.results)
    .toEqual(arrayContaining([
      objectContaining({
        formatted_address: stringMatching(/2A Macquarie St, Sydney NSW 2000/)
      })
    ]));
  }

  it('reverse geocodes the coordinates for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8571965, 151.2151398],
    })
    .asPromise()
    .then(expectOK)
    .then(expect2aMacquarieStreet)
    .then(done, fail);
  });

  it('reverse geocodes the place ID for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      place_id: 'ChIJidzEjmauEmsRwb535u6rCA4'
    })
    .asPromise()
    .then(expectOK)
    .then(expect2aMacquarieStreet)
    .then(done, fail);
  });

  it('accepts localization options', function(done) {
    googleMaps.reverseGeocode({
      place_id: 'ChIJidzEjmauEmsRwb535u6rCA4',
      language: 'en'
    })
    .asPromise()
    .then(expectOK)
    .then(expect2aMacquarieStreet)
    .then(done, fail);
  });

  it('filters by result_type and location_type', function(done) {
    pending('does not work with my API key');
    googleMaps.reverseGeocode({
      place_id: 'ChIJidzEjmauEmsRwb535u6rCA4',
      result_type: ['country', 'street_address'],
      location_type: ['ROOFTOP', 'APPROXIMATE']
    })
    .asPromise()
    .then(expectOK)
    .then(expect2aMacquarieStreet)
    .then(done, fail);
  });

});
