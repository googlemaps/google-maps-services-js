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

var Convert = require('../../lib/internal/convert');
var Validate = require('../../lib/internal/validate');
var InvalidValueError = Validate.InvalidValueError;

describe('Convert', function() {

  describe('.pipedKeyValues', function() {

    it('rejects non-objects', function() {
      expect(function() {
        Convert.pipedKeyValues('hello')
      }).toThrowError(InvalidValueError, /not an Object/);
    });

    it('works with primitive values as properties', function() {
      var testObject = { foo: 'bar', baz: 'bing' }
      var pipedString = Convert.pipedKeyValues(testObject)
      expect(pipedString).toEqual('baz:bing|foo:bar');
    });

    it('works with arrays as properties', function() {
      var testObject = { foo: 'bar', baz: ['bing', 'bong'] }
      var pipedString = Convert.pipedKeyValues(testObject)
      expect(pipedString).toEqual('baz:bing|baz:bong|foo:bar');
    });

  });

});
