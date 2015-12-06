var utils = require('../internal/convert');
var v = require('../internal/validate');

/**
 * Makes a places request.
 *
 * @name GoogleMapsClient#places
 * @function
 * @param {Object} query
 * @param {string} query.query
 * @param {string} [query.language]
 * @param {LatLng} [query.location]
 * @param {number} [query.radius]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {boolean} [query.opennow]
 * @param {string[]} [query.types]
 * @param {string} [query.pagetoken]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
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
 * Makes a place request.
 *
 * @name GoogleMapsClient#place
 * @function
 * @param {Object} query
 * @param {string} query.placeid
 * @param {string} [query.language]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
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
 * Makes a place photos request.
 *
 * @name GoogleMapsClient#placesPhoto
 * @function
 * @param {Object} query
 * @param {string} query.photoreference
 * @param {number} [query.maxwidth]
 * @param {number} [query.maxheight]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
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
 * Makes a places autocomplete request.
 *
 * @name GoogleMapsClient#placesAutoComplete
 * @function
 * @param {Object} query
 * @param {string} query.input
 * @param {number} [query.offset]
 * @param {LatLng} [query.location]
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
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
