exports.init = function(apiKey, Promise) {
  return {
    geocode: require('./geocode').init(apiKey, Promise)
  };
};
