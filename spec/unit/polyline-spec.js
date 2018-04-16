/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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

describe('Polyline util', function() {

  var util = require('../../lib/index').util;
  var encoded = 'gcneIpgxzRcDnBoBlEHzKjBbHlG`@`IkDxIiKhKoMaLwTwHeIqHuAyGXeB~Ew@fFjAtIzExF';
  var decoded = util.decodePath(encoded);

  it('decodes', function() {
    expect(decoded[0]).toEqual({lat: 53.489320000000006, lng: -104.16777});
    expect(decoded[1]).toEqual({lat: 53.490140000000004, lng: -104.16833000000001});
    expect(decoded[2]).toEqual({lat: 53.490700000000004, lng: -104.16936000000001});
  });

  it('encodes and decodes', function() {
    expect(util.encodePath(decoded)).toEqual(encoded);
  });

});
