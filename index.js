exports.init = function(apiKey, fetch) {
  return {
    geocode: require('./geocode').inject(apiKey, fetch).geocode
  };
};
