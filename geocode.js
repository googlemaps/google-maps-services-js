var url = require('url');

exports.inject = function(apiKey, fetch) {
  return {

    geocode: function(query) {
      // TODO(step): Sanitize the query, and do something with apiKey.
      return fetch(url.format({
        pathname: 'https://maps.googleapis.com/maps/api/geocode/json',
        query: query
      }));
    }

  };
};
