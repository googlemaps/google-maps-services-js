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
var numberCloseTo = require('../number-close-to');

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
              elevation: numberCloseTo(16).within(5)
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets the elevation for a path', function(done) {
    googleMaps.elevationAlongPath({
      path: [[-33.7287972,150.300299], [-33.7311794,150.301794]],
      samples: 5
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.results).toEqual(
          arrayContaining([
            objectContaining({
              elevation: numberCloseTo(959)
            }),
            objectContaining({
              elevation: numberCloseTo(771)
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
