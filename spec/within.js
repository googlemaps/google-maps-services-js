module.exports = function(within) {
  return {of: function(expected) {
    return {asymmetricMatch: function(actual) {
      return expected - within <= actual
          && expected + within >= actual;
    }};
  }};
};
