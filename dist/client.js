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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.defaultAxiosInstance = exports.X_GOOG_MAPS_EXPERIENCE_ID = exports.acceptEncoding = exports.userAgent = exports.defaultTimeout = exports.defaultHttpsAgent = exports.version = void 0;
const rax = __importStar(require("retry-axios"));
const directions_1 = require("./directions");
const distance_1 = require("./distance");
const elevation_1 = require("./elevation");
const findplacefromtext_1 = require("./places/findplacefromtext");
const geocode_1 = require("./geocode/geocode");
const geolocate_1 = require("./geolocate");
const nearestroads_1 = require("./roads/nearestroads");
const autocomplete_1 = require("./places/autocomplete");
const details_1 = require("./places/details");
const photo_1 = require("./places/photo");
const queryautocomplete_1 = require("./places/queryautocomplete");
const placesnearby_1 = require("./places/placesnearby");
const reversegeocode_1 = require("./geocode/reversegeocode");
const snaptoroads_1 = require("./roads/snaptoroads");
const textsearch_1 = require("./places/textsearch");
const timezone_1 = require("./timezone");
const axios_1 = __importDefault(require("axios"));
const agentkeepalive_1 = require("agentkeepalive");
const adapter_1 = require("./adapter");
// Cannot be `import` as it's not under TS root dir
exports.version = require("../package.json").version;
exports.defaultHttpsAgent = new agentkeepalive_1.HttpsAgent({ keepAlive: true });
exports.defaultTimeout = 10000;
exports.userAgent = `google-maps-services-node-${exports.version}`;
exports.acceptEncoding = "gzip";
exports.X_GOOG_MAPS_EXPERIENCE_ID = "X-GOOG-MAPS-EXPERIENCE-ID";
const defaultConfig = {
    timeout: exports.defaultTimeout,
    httpsAgent: exports.defaultHttpsAgent,
    adapter: adapter_1.customAdapter,
    headers: {
        "User-Agent": exports.userAgent,
        "Accept-Encoding": exports.acceptEncoding,
    },
};
exports.defaultAxiosInstance = axios_1.default.create(defaultConfig);
rax.attach(exports.defaultAxiosInstance);
/**
 * Client is a light wrapper around API methods providing shared configuration for Axios
 * settings such as retry logic using the default retry-axios settings and gzip encoding.
 *
 * ### Instantiate with defaults
 * ```
 * const client = Client()
 * ```
 *
 * ### Instantiate with config
 * ```
 * const client = Client({config})
 * ```
 *
 * ### Instantiate with axiosInstance **Advanced**
 * ```
 * const axiosInstance = axios.create(config)
 * const client = Client({axiosInstance})
 * ```
 */
class Client {
    constructor({ axiosInstance, config, experienceId } = {}) {
        if (axiosInstance && config) {
            throw new Error("Provide one of axiosInstance or config.");
        }
        if (axiosInstance) {
            this.axiosInstance = axiosInstance;
            this.axiosInstance.defaults.headers = Object.assign(Object.assign({}, defaultConfig.headers), this.axiosInstance.defaults.headers);
        }
        else if (config) {
            config = Object.assign(Object.assign({}, defaultConfig), config);
            config.headers = Object.assign(Object.assign({}, defaultConfig.headers), (config.headers || {}));
            this.axiosInstance = axios_1.default.create(config);
            rax.attach(this.axiosInstance);
        }
        else {
            this.axiosInstance = exports.defaultAxiosInstance;
        }
        if (experienceId) {
            this.setExperienceId(...experienceId);
        }
    }
    setExperienceId(...ids) {
        this.experienceId = ids;
        this.axiosInstance.defaults.headers[exports.X_GOOG_MAPS_EXPERIENCE_ID] =
            ids.join(",");
    }
    clearExperienceId() {
        this.experienceId = null;
        delete this.axiosInstance.defaults.headers[exports.X_GOOG_MAPS_EXPERIENCE_ID];
    }
    getExperienceId() {
        return this.experienceId;
    }
    directions(request) {
        return (0, directions_1.directions)(request, this.axiosInstance);
    }
    distancematrix(request) {
        return (0, distance_1.distancematrix)(request, this.axiosInstance);
    }
    elevation(request) {
        return (0, elevation_1.elevation)(request, this.axiosInstance);
    }
    timezone(request) {
        return (0, timezone_1.timezone)(request, this.axiosInstance);
    }
    geolocate(request) {
        return (0, geolocate_1.geolocate)(request, this.axiosInstance);
    }
    /**
     * An example use of this function.
     *
     * ```javascript
     * import { Client } from '@googlemaps/google-maps-services-js';
     *
     * const args = {
     *   params: {
     *     key: '<your-api-key>',
     *     address: 'Perth 4WD & Commercial Centre',
     *   }
     * };
     * const client = new Client();
     * client.geocode(args).then(gcResponse => {
     *   const str = JSON.stringify(gcResponse.data.results[0]);
     *   console.log(`First result is: ${str}`);
     * });
     * ```
     */
    geocode(request) {
        return (0, geocode_1.geocode)(request, this.axiosInstance);
    }
    reverseGeocode(request) {
        return (0, reversegeocode_1.reverseGeocode)(request, this.axiosInstance);
    }
    placeAutocomplete(request) {
        return (0, autocomplete_1.placeAutocomplete)(request, this.axiosInstance);
    }
    placeDetails(request) {
        return (0, details_1.placeDetails)(request, this.axiosInstance);
    }
    findPlaceFromText(request) {
        return (0, findplacefromtext_1.findPlaceFromText)(request, this.axiosInstance);
    }
    placePhoto(request) {
        return (0, photo_1.placePhoto)(request, this.axiosInstance);
    }
    placesNearby(request) {
        return (0, placesnearby_1.placesNearby)(request, this.axiosInstance);
    }
    placeQueryAutocomplete(request) {
        return (0, queryautocomplete_1.placeQueryAutocomplete)(request, this.axiosInstance);
    }
    textSearch(request) {
        return (0, textsearch_1.textSearch)(request, this.axiosInstance);
    }
    nearestRoads(request) {
        return (0, nearestroads_1.nearestRoads)(request, this.axiosInstance);
    }
    snapToRoads(request) {
        return (0, snaptoroads_1.snapToRoads)(request, this.axiosInstance);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map