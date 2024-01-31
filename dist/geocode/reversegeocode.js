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
exports.reverseGeocode = exports.defaultParamsSerializer = exports.defaultUrl = exports.ReverseGeocodingLocationType = void 0;
const serialize_1 = require("../serialize");
const client_1 = require("../client");
/**
 * If both `result_type` and `location_type` filters are present then the API returns only those results that match both the
 * `result_type` and the `location_type` values. If none of the filter values are acceptable, the API returns `ZERO_RESULTS`.
 */
var ReverseGeocodingLocationType;
(function (ReverseGeocodingLocationType) {
    /** returns only the addresses for which Google has location information accurate down to street address precision. */
    ReverseGeocodingLocationType["ROOFTOP"] = "ROOFTOP";
    /**
     * returns only the addresses that reflect an approximation (usually on a road) interpolated between two precise points
     * (such as intersections). An interpolated range generally indicates that rooftop geocodes are unavailable for a street address.
     */
    ReverseGeocodingLocationType["RANGE_INTERPOLATED"] = "RANGE_INTERPOLATED";
    /** returns only geometric centers of a location such as a polyline (for example, a street) or polygon (region). */
    ReverseGeocodingLocationType["GEOMETRIC_CENTER"] = "GEOMETRIC_CENTER";
    /** returns only the addresses that are characterized as approximate. */
    ReverseGeocodingLocationType["APPROXIMATE"] = "APPROXIMATE";
})(ReverseGeocodingLocationType || (exports.ReverseGeocodingLocationType = ReverseGeocodingLocationType = {}));
exports.defaultUrl = "https://maps.googleapis.com/maps/api/geocode/json";
exports.defaultParamsSerializer = (0, serialize_1.serializer)({
    latlng: serialize_1.latLngToString,
}, exports.defaultUrl);
function reverseGeocode(_a, axiosInstance) {
    var { params, method = "get", url = exports.defaultUrl, paramsSerializer = exports.defaultParamsSerializer } = _a, config = __rest(_a, ["params", "method", "url", "paramsSerializer"]);
    if (axiosInstance === void 0) { axiosInstance = client_1.defaultAxiosInstance; }
    return axiosInstance(Object.assign({ params,
        method,
        url,
        paramsSerializer }, config));
}
exports.reverseGeocode = reverseGeocode;
//# sourceMappingURL=reversegeocode.js.map