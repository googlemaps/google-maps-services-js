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

var Promise = require('q').Promise;

var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;
var stringMatching = jasmine.stringMatching;

describe('places client library with multiple of the same component', function() {
  var googleMaps = require('./service');

  it('gets autocomplete predictions for places normally', function(done) {
    googleMaps.placesAutoComplete({
      input: 'pizza',
      language: 'en',
      location: [40.724, -74.013],
      radius: 5000,
      components: {country: 'us'}
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.predictions).toEqual(
          arrayContaining([
            objectContaining({
              terms: arrayContaining([
                objectContaining({
                  value: 'NY'
                })
              ])
            })
          ]));
    })
    .then(done, fail);
  });

  it('gets autocomplete predictions for places with multiple of the same component', function(done) {
    googleMaps.placesAutoComplete({
      input: 'pizza',
      language: 'en',
      location: [40.724, -74.013],
      radius: 5000,
      components: {country: ['us', 'ca']}
    })
    .asPromise()
    .then(function(response) {
      expect(response.json.predictions).toEqual(
          arrayContaining([
            objectContaining({
              terms: arrayContaining([
                objectContaining({
                  value: 'NY'
                })
              ])
            })
          ]));
    })
    .then(done, fail);
  });

});
