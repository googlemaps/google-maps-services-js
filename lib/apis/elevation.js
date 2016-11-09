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
 * Makes an elevation request.
 *
 * @name GoogleMapsClient#elevation
 * @function
 * @param {Object} query
 * @param {LatLng[]} query.locations
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevation = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    locations: utils.pipedArrayOf(utils.latLng),
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};

/**
 * Makes an elevation-along-path request.
 *
 * @name GoogleMapsClient#elevationAlongPath
 * @function
 * @param {Object} query
 * @param {LatLng[]|string} query.path
 * @param {number} query.samples
 * @param {ResponseCallback} callback Callback function for handling the result
 * @return {RequestHandle}
 */
exports.elevationAlongPath = {
  url: 'https://maps.googleapis.com/maps/api/elevation/json',
  validator: v.object({
    path: function(path) {
      if (typeof path == 'string') {
        return 'enc:' + path;
      } else {
        return utils.pipedArrayOf(utils.latLng)(path);
      }
    },
    samples: v.number,
    retryOptions: v.optional(utils.retryOptions),
    timeout: v.optional(v.number)
  })
};
