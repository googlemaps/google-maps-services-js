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

var CircularBuffer = require('../../lib/internal/circular-buffer');

describe('CircularBuffer,', function() {
  var SIZE = 10;
  var list;
  beforeEach(function() {
    list = CircularBuffer.create(SIZE);
  });

  describe('when empty,', function() {
    it('.item() returns undefined', function() {
      expect(list.item(0)).toBe(undefined);
      expect(list.item(1)).toBe(undefined);
      expect(list.item(SIZE - 1)).toBe(undefined);
    });
  });

  describe('when one item has been inserted,', function() {
    beforeEach(function() {
      list.insert('item 0');
    });
    it('.item(0) returns the recently-inserted item', function() {
      expect(list.item(0)).toBe('item 0');
    });
    it('.item(i) returns undefined for i > 0', function() {
      expect(list.item(1)).toBe(undefined);
      expect(list.item(SIZE - 1)).toBe(undefined);
    });
  });

  describe('when SIZE - 1 items have been inserted,', function() {
    beforeEach(function() {
      for (var i = 0; i < SIZE - 1; ++i) {
        list.insert('item ' + i);
      }
    });
    it('.item(i) returns items in reverse order', function() {
      expect(list.item(0)).toBe('item ' + (SIZE - 2));
      expect(list.item(SIZE - 2)).toBe('item 0');
    });
    it('.item(SIZE - 1) returns undefined', function() {
      expect(list.item(SIZE - 1)).toBe(undefined);
    });
  });

  describe('when SIZE items have been inserted,', function() {
    beforeEach(function() {
      for (var i = 0; i < SIZE; ++i) {
        list.insert('item ' + i);
      }
    });
    it('.item(i) returns items in reverse order', function() {
      expect(list.item(0)).toBe('item ' + (SIZE - 1));
      expect(list.item(SIZE - 1)).toBe('item 0');
    });
  });

  describe('when SIZE + 1 items have been inserted,', function() {
    beforeEach(function() {
      for (var i = 0; i < SIZE + 1; ++i) {
        list.insert('item ' + i);
      }
    });
    it('.item(i) returns items in reverse order', function() {
      expect(list.item(0)).toBe('item ' + SIZE);
      expect(list.item(SIZE - 1)).toBe('item 1');
    });

    it('"item 0" is no longer in the buffer', function() {
      for (var i = 0; i < SIZE; ++i) {
        expect(list.item(i)).not.toBe('item 0');
      }
    });
  });
});
