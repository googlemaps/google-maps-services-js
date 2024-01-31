"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesNearby = exports.defaultParamsSerializer = exports.defaultUrl = exports.PlacesNearbyRanking = void 0;
const serialize_1 = require("../serialize");
const client_1 = require("../client");
var PlacesNearbyRanking;
(function (PlacesNearbyRanking) {
    /**
     * This option sorts results based on their importance. Ranking will favor prominent places within the specified area.
     * Prominence can be affected by a place's ranking in Google's index, global popularity, and other factors.
     */
    PlacesNearbyRanking["prominence"] = "prominence";
    /**
     * This option biases search results in ascending order by their distance from the specified `location`.
     * When distance is specified, one or more of `keyword`, `name`, or `type` is required.
     */
    PlacesNearbyRanking["distance"] = "distance";
})(PlacesNearbyRanking || (exports.PlacesNearbyRanking = PlacesNearbyRanking = {}));
exports.defaultUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
exports.defaultParamsSerializer = (0, serialize_1.serializer)({ location: serialize_1.latLngToString }, exports.defaultUrl);
function placesNearby(_a, axiosInstance) {
    var { params, method = "get", url = exports.defaultUrl, paramsSerializer = exports.defaultParamsSerializer } = _a, config = __rest(_a, ["params", "method", "url", "paramsSerializer"]);
    if (axiosInstance === void 0) { axiosInstance = client_1.defaultAxiosInstance; }
    return axiosInstance(Object.assign({ params,
        method,
        url,
        paramsSerializer }, config));
}
exports.placesNearby = placesNearby;
//# sourceMappingURL=placesnearby.js.map