exports.create = function(size) {
  var items = [];
  var current = 0;

  return {
    /**
     * Inserts an item into the circular buffer. The new item will have index 0,
     * and all other items will have their index incremented.
     */
    insert: function(item) {
      current = (current + 1) % size;
      items[current] = item;
    },
    /**
     * Returns the i-th item from the buffer. i=0 is the most-recently-inserted
     * item. i=1 is the second-most-recently-inserted item. Returns undefined if
     * i+1 items have not yet been inserted.
     */
    item: function(i) {
      return items[(current - i + size) % size];
    }
  };
};
