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
 */

/**
 * Google Maps Service module.
 * @module @google/maps
 */

/**
 * Creates a Google Maps client. The client object contains all the API methods.
 *
 * @param {Object} options
 * @param {string} options.key API key (required, unless clientID and
 *     clientSecret provided).
 * @param {string=} options.clientId Maps API for Work client ID.
 * @param {string=} options.clientSecret Maps API for Work client secret (a.k.a.
 *     private key).
 * @param {string=} options.channel Maps API for Work channel.
 * @param {number=} options.timeout Timeout in milliseconds.
 *     (Default: 60 * 1000 ms)
 * @param {number=} options.rate.limit Controls rate-limiting of requests.
 *     Maximum number of requests per period. (Default: 10)
 * @param {number=} options.rate.period Period for rate limit, in milliseconds.
 *     (Default: 1000 ms)
 * @param {number=} options.retryOptions.interval If a transient server error
 *     occurs, how long to wait before retrying the request, in milliseconds.
 *     (Default: 500 ms)
 * @param {Function=} options.Promise - Promise constructor (optional).
 * @return {GoogleMapsClient} The client object containing all API methods.
 */
 exports.createClient = function(options) {

  var makeApiCall = require('./internal/make-api-call').inject(options || {});

  var makeApiMethod = function(apiConfig) {
    return function(query, callback) {
      query = apiConfig.validator(query);
      query.supportsClientId = apiConfig.supportsClientId !== false;
      return makeApiCall(apiConfig.url, query, callback);
    };
  };

  var geocode = require('./apis/geocode');
  var timezone = require('./apis/timezone');
  var directions = require('./apis/directions');
  var distanceMatrix = require('./apis/distance-matrix');
  var elevation = require('./apis/elevation');
  var roads = require('./apis/roads');
  var places = require('./apis/places');

  return {
    directions: makeApiMethod(directions.directions),
    distanceMatrix: makeApiMethod(distanceMatrix.distanceMatrix),
    elevation: makeApiMethod(elevation.elevation),
    elevationAlongPath: makeApiMethod(elevation.elevationAlongPath),
    geocode: makeApiMethod(geocode.geocode),
    reverseGeocode: makeApiMethod(geocode.reverseGeocode),
    places: makeApiMethod(places.places),
    placesNearby: makeApiMethod(places.placesNearby),
    placesRadar: makeApiMethod(places.placesRadar),
    place: makeApiMethod(places.place),
    placesPhoto: makeApiMethod(places.placesPhoto),
    placesAutoComplete: makeApiMethod(places.placesAutoComplete),
    snapToRoads: makeApiMethod(roads.snapToRoads),
    nearestRoads: makeApiMethod(roads.nearestRoads),
    speedLimits: makeApiMethod(roads.speedLimits),
    snappedSpeedLimits: makeApiMethod(roads.snappedSpeedLimits),
    timezone: makeApiMethod(timezone.timezone)
  };

};

exports.cli = require('./internal/cli');
