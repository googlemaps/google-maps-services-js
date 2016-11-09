/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;

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
 * @param {string} [query.type]
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
    type: v.optional(v.string),
    pagetoken: v.optional(v.string),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};

/**
 * Makes a nearby places request.
 *
 * @name GoogleMapsClient#placesNearby
 * @function
 * @param {Object} query
 * @param {LatLng} query.location
 * @param {string} [query.language]
 * @param {number} [query.radius]
 * @param {string} [query.keyword]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {string} [query.name]
 * @param {boolean} [query.opennow]
 * @param {string} [query.rankby] Either 'prominence' or 'distance'
 * @param {string} [query.type]
 * @param {string} [query.pagetoken]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesNearby = {
  url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
  validator: v.object({
    location: utils.latLng,
    language: v.optional(v.string),
    radius: v.optional(v.number),
    keyword: v.optional(v.string),
    minprice: v.optional(v.number),
    maxprice: v.optional(v.number),
    name: v.optional(v.string),
    opennow: v.optional(v.boolean),
    rankby: v.optional(v.oneOf(['prominence', 'distance'])),
    type: v.optional(v.string),
    pagetoken: v.optional(v.string),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};

/**
 * Makes a places radar search request.
 *
 * @name GoogleMapsClient#placesRadar
 * @function
 * @param {Object} query
 * @param {LatLng} query.location
 * @param {number} query.radius
 * @param {string} [query.language]
 * @param {string} [query.keyword]
 * @param {number} [query.minprice]
 * @param {number} [query.maxprice]
 * @param {string} [query.name]
 * @param {boolean} [query.opennow]
 * @param {string} [query.type]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesRadar = {
  url: 'https://maps.googleapis.com/maps/api/place/radarsearch/json',
  validator: v.object({
    location: utils.latLng,
    radius: v.number,
    language: v.optional(v.string),
    keyword: v.optional(v.string),
    minprice: v.optional(v.number),
    maxprice: v.optional(v.number),
    name: v.optional(v.string),
    opennow: v.optional(v.boolean),
    type: v.optional(v.string),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
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
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
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
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
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
 * @param {string} [query.type]
 * @param {Array<string>} [query.components]
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.placesAutoComplete = {
  url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  validator: v.object({
    input: v.string,
    offset: v.optional(v.number),
    location: v.optional(utils.latLng),
    language: v.optional(v.string),
    radius: v.optional(v.number),
    type: v.optional(v.string),
    components: v.optional(utils.pipedKeyValues),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};


/**
 * Makes a places query autocomplete request.
 *
 * @name GoogleMapsClient#placesQueryAutoComplete
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
exports.placesQueryAutoComplete = {
  url: 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json',
  validator: v.object({
    input: v.string,
    offset: v.optional(v.number),
    location: v.optional(utils.latLng),
    language: v.optional(v.string),
    radius: v.optional(v.number),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};
