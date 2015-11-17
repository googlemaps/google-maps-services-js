var MostRecentlyUsedList = require('../lib/most-recently-used-list');

describe('MostRecentlyUsedList,', function() {
  var SIZE = 10;
  var list;
  beforeEach(function() {
    list = MostRecentlyUsedList.create(SIZE);
  });

  describe('when empty,', function() {
    it('.tail() returns undefined', function() {
      expect(list.tail()).toBe(undefined);
    });
  });

  describe('when one item has been pushed,', function() {
    beforeEach(function() {
      list.push(100);
    });
    it('.tail() returns undefined', function() {
      expect(list.tail()).toBe(undefined);
    });
  });

  describe('when SIZE - 1 items have been pushed,', function() {
    beforeEach(function() {
      for (var i = 0; i < SIZE - 1; ++i) {
        list.push(i + 100);
      }
    });
    it('.tail() returns undefined', function() {
      expect(list.tail()).toBe(undefined);
    });

    describe('when another item is pushed,', function() {
      beforeEach(function() {
        list.push(SIZE + 100);
      });
      it('.tail() returns the first item', function() {
        expect(list.tail()).toBe(100);
      });

      describe('when another item is pushed,', function() {
        beforeEach(function() {
          list.push(SIZE + 101);
        });
        it('.tail() returns the second item', function() {
          expect(list.tail()).toBe(101);
        });
      });
    });
  });
});
