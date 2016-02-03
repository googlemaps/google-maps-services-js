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

var objectContaining = jasmine.objectContaining;

describe('timezone client library', function() {
  var googleMaps = require('./service');

  it('gets the timezone for the Sydney Opera House', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398],
      timestamp: 1331766000,
      language: 'en'
    })
    .asPromise()
    .then(function(response) {
      expect(response.json).toEqual(
          objectContaining({
            status: 'OK',
            rawOffset: 36000,
            dstOffset: 0,
            timeZoneId: 'Australia/Sydney'
          }));
    })
    .then(done, fail);
  });

  it('the timestamp is optional', function(done) {
    googleMaps.timezone({
      location: [-33.8571965, 151.2151398]
    })
    .asPromise()
    .then(function(response) {
      expect(response.json).toEqual(
          objectContaining({
            status: 'OK',
            timeZoneId: 'Australia/Sydney'
          }));
    })
    .then(done, fail);
  });

});
