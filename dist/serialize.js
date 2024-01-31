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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPremiumPlanQueryString = exports.toTimestamp = exports.serializer = exports.latLngArrayToStringMaybeEncoded = exports.toLatLngLiteral = exports.latLngBoundsToString = exports.objectToString = exports.latLngToString = void 0;
const util_1 = require("./util");
const url_signature_1 = require("@googlemaps/url-signature");
const query_string_1 = __importDefault(require("query-string"));
const qs = query_string_1.default.stringify;
const separator = "|";
function latLngToString(o) {
    if (typeof o === "string") {
        return o;
    }
    else if (Array.isArray(o) && o.length === 2) {
        // no transformation
    }
    else if ("lat" in o && "lng" in o) {
        o = [o.lat, o.lng];
    }
    else if ("latitude" in o && "longitude" in o) {
        o = [o.latitude, o.longitude];
    }
    else {
        throw new TypeError();
    }
    return o
        .map((x) => {
        return x.toString();
    })
        .join(",");
}
exports.latLngToString = latLngToString;
function objectToString(o) {
    if (typeof o === "string") {
        return o;
    }
    else {
        const keys = Object.keys(o);
        keys.sort();
        return keys.map((k) => k + ":" + o[k]).join(separator);
    }
}
exports.objectToString = objectToString;
function latLngBoundsToString(latLngBounds) {
    if (typeof latLngBounds === "string") {
        return latLngBounds;
    }
    else {
        return (latLngToString(latLngBounds.southwest) +
            separator +
            latLngToString(latLngBounds.northeast));
    }
}
exports.latLngBoundsToString = latLngBoundsToString;
function toLatLngLiteral(o) {
    if (typeof o === "string") {
        const parts = o.split(",").map(Number);
        return { lat: parts[0], lng: parts[1] };
    }
    else if (Array.isArray(o) && o.length === 2) {
        const parts = o.map(Number);
        return { lat: parts[0], lng: parts[1] };
    }
    else if ("lat" in o && "lng" in o) {
        return o;
    }
    else if ("latitude" in o && "longitude" in o) {
        return { lat: o.latitude, lng: o.longitude };
    }
    else {
        throw new TypeError();
    }
}
exports.toLatLngLiteral = toLatLngLiteral;
function latLngArrayToStringMaybeEncoded(o) {
    if (typeof o === "string") {
        return o;
    }
    const concatenated = o.map(latLngToString).join(separator);
    const encoded = `enc:${(0, util_1.encodePath)(o.map(toLatLngLiteral))}`;
    if (encoded.length < concatenated.length) {
        return encoded;
    }
    return concatenated;
}
exports.latLngArrayToStringMaybeEncoded = latLngArrayToStringMaybeEncoded;
function serializer(format, baseUrl, queryStringOptions = {
    arrayFormat: "separator",
    arrayFormatSeparator: separator,
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (params) => {
        // avoid mutating params
        const serializedParams = Object.assign({}, params);
        for (const key of Object.keys(format)) {
            if (key in serializedParams) {
                serializedParams[key] = format[key](serializedParams[key]);
            }
        }
        if ("client_id" in serializedParams &&
            "client_secret" in serializedParams) {
            // Special case to handle premium plan signature
            return createPremiumPlanQueryString(serializedParams, queryStringOptions, baseUrl);
        }
        return qs(serializedParams, queryStringOptions);
    };
}
exports.serializer = serializer;
function toTimestamp(o) {
    if (o === "now") {
        return o;
    }
    if (o instanceof Date) {
        return Math.round(Number(o) / 1000);
    }
    return o;
}
exports.toTimestamp = toTimestamp;
function createPremiumPlanQueryString(serializedParams, queryStringOptions, baseUrl) {
    serializedParams.client = serializedParams.client_id;
    const clientSecret = serializedParams.client_secret;
    delete serializedParams.client_id;
    delete serializedParams.client_secret;
    const partialQueryString = qs(serializedParams, queryStringOptions);
    const unsignedUrl = `${baseUrl}?${partialQueryString}`;
    const signature = (0, url_signature_1.createSignature)(unsignedUrl, clientSecret);
    // The signature must come last
    return `${partialQueryString}&signature=${signature}`;
}
exports.createPremiumPlanQueryString = createPremiumPlanQueryString;
//# sourceMappingURL=serialize.js.map