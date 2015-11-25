var utils = require('../utils');
var v = require('../validate');

var validatePlacesQuery = v.object({
  query: v.string,
  language: v.optional(v.string),
  location: v.optional(utils.latLng),
  radius: v.optional(v.number),
  minprice: v.optional(v.number),
  maxprice: v.optional(v.number),
  opennow: v.optional(v.boolean),
  types: v.optional(v.array(v.string)),
  pagetoken: v.optional(v.string)
});

var validatePlaceQuery = v.object({
  placeid: v.string,
  language: v.optional(v.string)
});

var validatePlacesPhotoQuery = v.object({
  photoreference: v.string,
  maxwidth: v.optional(v.number),
  maxheight: v.optional(v.number)
});

var validatePlacesAutoCompleteQuery = v.object({
  input: v.string,
  offset: v.optional(v.number),
  location: v.optional(utils.latLng),
  language: v.optional(v.string),
  radius: v.optional(v.number)
});

exports.inject = function(url, makeApiCall) {
  return {

    places: function(query, callback) {
      query = validatePlacesQuery(query);
      return makeApiCall(url + 'textsearch/json', query, callback);
    },

    place: function(query, callback) {
      query = validatePlaceQuery(query);
      return makeApiCall(url + 'details/json', query, callback);
    },

    placesPhoto: function(query, callback) {
      query = validatePlacesPhotoQuery(query);
      return makeApiCall(url + 'photo', query, callback);
    },

    placesAutoComplete: function(query, callback) {
      query = validatePlacesAutoCompleteQuery(query);
      return makeApiCall(url + 'queryautocomplete/json', query, callback);
    }

  };
};
