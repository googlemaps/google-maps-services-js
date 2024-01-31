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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePath = exports.encodePath = void 0;
/**
 * Polyline encodes an array of LatLng objects.
 *
 * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
 *
 */
function encodePath(path) {
    const result = [];
    let start = [0, 0];
    let end;
    const encodePart = function (part) {
        part = part < 0 ? ~(part << 1) : part << 1;
        while (part >= 0x20) {
            result.push(String.fromCharCode((0x20 | (part & 0x1f)) + 63));
            part >>= 5;
        }
        result.push(String.fromCharCode(part + 63));
    };
    for (let i = 0, I = path.length || 0; i < I; ++i) {
        end = [Math.round(path[i].lat * 1e5), Math.round(path[i].lng * 1e5)];
        encodePart(end[0] - start[0]); // lat
        encodePart(end[1] - start[1]); // lng
        start = end;
    }
    return result.join("");
}
exports.encodePath = encodePath;
/**
 * Decodes a polyline encoded string.
 *
 * See {@link https://developers.google.com/maps/documentation/utilities/polylinealgorithm}
 */
function decodePath(encodedPath) {
    const len = encodedPath.length || 0;
    const path = new Array(Math.floor(encodedPath.length / 2));
    let index = 0;
    let lat = 0;
    let lng = 0;
    let pointIndex;
    for (pointIndex = 0; index < len; ++pointIndex) {
        let result = 1;
        let shift = 0;
        let b;
        do {
            b = encodedPath.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lat += result & 1 ? ~(result >> 1) : result >> 1;
        result = 1;
        shift = 0;
        do {
            b = encodedPath.charCodeAt(index++) - 63 - 1;
            result += b << shift;
            shift += 5;
        } while (b >= 0x1f);
        lng += result & 1 ? ~(result >> 1) : result >> 1;
        path[pointIndex] = { lat: lat * 1e-5, lng: lng * 1e-5 };
    }
    path.length = pointIndex;
    return path;
}
exports.decodePath = decodePath;
//# sourceMappingURL=util.js.map