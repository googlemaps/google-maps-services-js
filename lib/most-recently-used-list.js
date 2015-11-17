exports.create = function(size) {
  var items = [];
  var current = 0;

  return {
    push: function(item) {
      current = (current + 1) % size;
      items[current] = item;
    },
    /**
     * Returns the tail of the list, or undefined if the list has not yet
     * reached capacity.
     */
    tail: function() {
      return items[(current + 1) % size];
    }
  };
};
