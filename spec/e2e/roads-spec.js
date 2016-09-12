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

describe('roads client library', function() {
  var googleMaps = require('./service');

  it('gets points snapped to roads', function(done) {
    googleMaps.snapToRoads({
      path: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ],
      interpolate: true
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.snappedPoints).toEqual(
          arrayContaining([
            objectContaining({
              originalIndex: 0,
              placeId: 'ChIJNX9BrM0LkkYRIM-cQg265e8'
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets nearest roads for points', function(done) {
    googleMaps.nearestRoads({
      points: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ]
    })
    .asPromise()
    .then(function(response) {
      console.log(response.json);
      expect(response.json.snappedPoints).toEqual(
          arrayContaining([
            objectContaining({
              originalIndex: 0,
              placeId: 'ChIJNX9BrM0LkkYRIM-cQg265e8'
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets speed limits for place IDs', function(done) {
    googleMaps.speedLimits({
      placeId: [
        'ChIJ58xCoGlNFmsRUEZUbW7qABM',
        'ChIJ9RhaiGlNFmsR0IxAbW7qABM',
        'ChIJabjuhGlNFmsREIxAbW7qABM'
      ],
      units: 'KPH'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.speedLimits).toEqual(
          arrayContaining([
            objectContaining({
              speedLimit: 40,
              units: 'KPH'
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets speed limits for a path', function(done) {
    googleMaps.snappedSpeedLimits({
      path: [
        [60.170880, 24.942795],
        [60.170879, 24.942796],
        [60.170877, 24.942796]
      ],
      units: 'MPH'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.speedLimits).toEqual(
          arrayContaining([
            objectContaining({
              speedLimit: closeTo(19, 1),
              units: 'MPH'
            })
          ]));
    })
    .then(done, fail);
  });

  function closeTo(expected, delta) {
    return {asymmetricMatch: function(actual) {
      return Math.abs(actual - expected) < delta;
    }};
  }

});
