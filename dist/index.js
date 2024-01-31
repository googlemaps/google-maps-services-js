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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseGeocodingLocationType = exports.PlacesNearbyRanking = exports.PlaceAutocompleteType = exports.GeolocateErrorReason = void 0;
var geolocate_1 = require("./geolocate");
Object.defineProperty(exports, "GeolocateErrorReason", { enumerable: true, get: function () { return geolocate_1.GeolocateErrorReason; } });
var autocomplete_1 = require("./places/autocomplete");
Object.defineProperty(exports, "PlaceAutocompleteType", { enumerable: true, get: function () { return autocomplete_1.PlaceAutocompleteType; } });
var placesnearby_1 = require("./places/placesnearby");
Object.defineProperty(exports, "PlacesNearbyRanking", { enumerable: true, get: function () { return placesnearby_1.PlacesNearbyRanking; } });
var reversegeocode_1 = require("./geocode/reversegeocode");
Object.defineProperty(exports, "ReverseGeocodingLocationType", { enumerable: true, get: function () { return reversegeocode_1.ReverseGeocodingLocationType; } });
__exportStar(require("./common"), exports);
__exportStar(require("./client"), exports);
//# sourceMappingURL=index.js.map