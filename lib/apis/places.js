var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * @name places
 * @function
 *
 * @param {Object} query
 * @param {string} query.query
 * @param {string} [query.language]
 * @param {latlng} [query.location]
 * @param {number} [query.radius]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {boolean} [query.opennow]
 * @param {string[]} [query.types]
 * @param {string} [query.pagetoken]
 * @param {callback} callback Callback function for handling the result
 */
exports.places = {
  url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
  validator: v.object({
    query: v.optional(v.string),
    language: v.optional(v.string),
    location: v.optional(utils.latLng),
    radius: v.optional(v.number),
    minprice: v.optional(v.number),
    maxprice: v.optional(v.number),
    opennow: v.optional(v.boolean),
    types: v.optional(utils.pipedArrayOf(v.string)),
    pagetoken: v.optional(v.string),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * @name place
 * @function
 *
 * @param {Object} query
 * @param {string} query.placeid
 * @param {string} [query.language]
 * @param {callback} callback Callback function for handling the result
 */
exports.place = {
  url: 'https://maps.googleapis.com/maps/api/place/details/json',
  validator: v.object({
    placeid: v.string,
    language: v.optional(v.string),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * @name placesPhoto
 * @function
 * @param {string} query.photoreference
 * @param {number} [query.maxwidth]
 * @param {number} [query.maxheight]
 *
 * @param {Object} query
 * @param {callback} callback Callback function for handling the result
 */
exports.placesPhoto = {
  url: 'https://maps.googleapis.com/maps/api/place/photo',
  validator: v.object({
    photoreference: v.string,
    maxwidth: v.optional(v.number),
    maxheight: v.optional(v.number),
    retryOptions: v.optional(utils.retryOptions)
  })
};

/**
 * @name placesAutoComplete
 * @function
 *
 * @param {Object} query
 * @param {string} query.input
 * @param {number} [query.offset]
 * @param {latlng} [query.location]
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {callback} callback Callback function for handling the result
 */
exports.placesAutoComplete = {
  url: 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json',
  validator: v.object({
    input: v.string,
    offset: v.optional(v.number),
    location: v.optional(utils.latLng),
    language: v.optional(v.string),
    radius: v.optional(v.number),
    types: v.optional(utils.pipedArrayOf(v.string)),
    components: v.optional(utils.pipedKeyValues),
    retryOptions: v.optional(utils.retryOptions)
  })
};
