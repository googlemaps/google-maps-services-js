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
exports.geolocate = exports.defaultUrl = exports.GeolocateErrorReason = void 0;
const client_1 = require("./client");
var GeolocateErrorReason;
(function (GeolocateErrorReason) {
    /**
     * You have exceeded your daily limit.
     * Domain: usageLimits
     * Code: 403
     */
    GeolocateErrorReason["dailyLimitExceeded"] = "dailyLimitExceeded";
    /**
     * Your API key is not valid for the Geolocate API. Please ensure that you've included the entire key,
     * and that you've either purchased the API or have enabled billing and activated the API to obtain the free quota.
     * Domain: usageLimits
     * Code: 400
     */
    GeolocateErrorReason["keyInvalid"] = "keyInvalid";
    /**
     * You have exceeded the requests per second per user limit that you configured in the Google Cloud Platform Console.
     * This limit should be configured to prevent a single or small group of users from exhausting your daily quota,
     * while still allowing reasonable access to all users.
     * Domain: usageLimits
     * Code: 403
     */
    GeolocateErrorReason["userRateLimitExceeded"] = "userRateLimitExceeded";
    /**
     * The request was valid, but no results were returned.
     * Domain: geolocation
     * Code: 404
     */
    GeolocateErrorReason["notFound"] = "notFound";
    /**
     * The request body is not valid JSON. Refer to the Request Body section for details on each field.
     * Domain: global
     * Code: 400
     */
    GeolocateErrorReason["parseError"] = "parseError";
})(GeolocateErrorReason || (exports.GeolocateErrorReason = GeolocateErrorReason = {}));
exports.defaultUrl = "https://www.googleapis.com/geolocation/v1/geolocate";
function geolocate(_a, axiosInstance) {
    var { params, method = "post", url = exports.defaultUrl } = _a, config = __rest(_a, ["params", "method", "url"]);
    if (axiosInstance === void 0) { axiosInstance = client_1.defaultAxiosInstance; }
    return axiosInstance(Object.assign({ params,
        method,
        url }, config));
}
exports.geolocate = geolocate;
//# sourceMappingURL=geolocate.js.map