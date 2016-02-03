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

var Validate = require('../../lib/internal/validate');
var InvalidValueError = Validate.InvalidValueError;

describe('Validate', function() {

  describe('.object', function() {
    var validate = Validate.object({
      a: Validate.number,
      b: Validate.optional(Validate.string)
    });

    it('returns a copy of a valid object', function() {
      var obj = {a: 1, b: 'hello'};
      expect(validate(obj)).toEqual(obj);
      expect(validate(obj)).not.toBe(obj);
    });

    it('respects optional properties', function() {
      expect(validate({a: 1})).toEqual({a: 1});
    });

    it('rejects invalid properties', function() {
      expect(function() {
        validate({a: false});
      }).toThrowError(InvalidValueError, /in property "a": not a number/);

      expect(function() {
        validate({a: 1, b: 2});
      }).toThrowError(InvalidValueError, /in property "b": not a string/);
    });

    it('rejects when properties are missing', function() {
      expect(function() {
        validate({b: 'what?'});
      }).toThrowError(InvalidValueError, /missing property "a"/);
    });

    it('rejects when unexpected properties are present', function() {
      expect(function() {
        validate({a: 1, b: 'hello', c: 'what?'});
      }).toThrowError(InvalidValueError, /unexpected property "c"/);
    });

    it('rejects non-objects', function() {
      expect(function() {
        validate(true);
      }).toThrowError(InvalidValueError, /not an Object/);
    });
  });

  describe('.array', function() {
    var validate = Validate.array(Validate.number);

    it('accepts arrays of valid elements', function() {
      expect(validate([])).toEqual([]);
      expect(validate([1, 2])).toEqual([1, 2]);
    });

    it('rejects non-arrays', function() {
      expect(function() {
        validate({});
      }).toThrowError(InvalidValueError, /not an Array/);
    });

    it('rejects arrays of invalid elements', function() {
      expect(function() {
        validate([1, true]);
      }).toThrowError(InvalidValueError, /at index 1: not a number/);
    });
  });

  describe('.oneOf', function() {
    var validate = Validate.oneOf(['one', 'two', 'three']);

    it('accepts the valid values', function() {
      expect(validate('one')).toBe('one');
      expect(validate('two')).toBe('two');
      expect(validate('three')).toBe('three');
    });

    it('rejects other values', function() {
      expect(function() {
        validate('four');
      }).toThrowError(InvalidValueError, /not one of "one", "two", "three"/);
    });
  });

  describe('.mutuallyExclusiveProperties', function() {
    var validate = Validate.mutuallyExclusiveProperties(['one', 'two', 'four']);

    it('accepts objects with none of the properties', function() {
      expect(validate({a: 1})).toEqual({a: 1});
    });

    it('accepts objects with exactly one of the properties', function() {
      expect(validate({one: 1, three: 3})).toEqual({one: 1, three: 3});
    });

    it('rejects objects with two of the properties', function() {
      expect(function() {
        validate({one: 1, four: 4});
      }).toThrowError(InvalidValueError, /"one" and "four"/);
    });

    it('rejects objects with more than two of the properties', function() {
      expect(function() {
        validate({one: 1, two: 2, four: 4});
      }).toThrowError(InvalidValueError, /"one", "two" and "four"/);
    });
  });

});
