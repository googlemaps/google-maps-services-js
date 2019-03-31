/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE'
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
  function expectBennelongPoint(response) {
    expect(response.json.results)
    .toEqual(arrayContaining([
      objectContaining({
        formatted_address: stringMatching('Bennelong Point, Sydney NSW 2000, Australia')
      })
    ]));
  }

  function expectOperaHouse(response) {
    expect(response.json.results)
    .toEqual(arrayContaining([
      objectContaining({
        formatted_address: stringMatching('Opera House Bennelong point, NSW, Australia')
      })
    ]));
  }

  function expectCircularQuay(response) {
    expect(response.json.results)
    .toEqual(arrayContaining([
      objectContaining({
        formatted_address: stringMatching('Unit 14/2 Circular Quay E, Sydney NSW 2000, Australia')
      })
    ]));
  }

  it('reverse geocodes the coordinates for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8567844,151.2152967],
    })
    .asPromise()
    .then(expectOK)
    .then(expectOperaHouse)
    .then(done, fail);
  });

  it('reverse geocodes the place ID for the Sydney Opera House', function(done) {
    googleMaps.reverseGeocode({
      place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE'
    })
    .asPromise()
    .then(expectOK)
    .then(expectBennelongPoint)
    .then(done, fail);
  });

  it('accepts localization options', function(done) {
    googleMaps.reverseGeocode({
      place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
      language: 'en'
    })
    .asPromise()
    .then(expectOK)
    .then(expectBennelongPoint)
    .then(done, fail);
  });

  it('filters by result_type and location_type', function(done) {
    googleMaps.reverseGeocode({
      latlng: [-33.8567844,151.2152967],
      result_type: ['country', 'street_address'],
      location_type: ['ROOFTOP', 'APPROXIMATE']
    })
    .asPromise()
    .then(expectOK)
    .then(expectCircularQuay)
    .then(done, fail);
  });

});
