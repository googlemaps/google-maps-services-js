exports.inject = function(requester) {
  return {
    geocode: function(query, callback) {
      return requester('/maps/api/geocode/json', query, callback);
    }
  };
};
