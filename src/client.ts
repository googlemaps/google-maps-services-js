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

import * as rax from "retry-axios";

import {
  DirectionsRequest,
  DirectionsResponse,
  directions,
} from "./directions";
import {
  DistanceMatrixRequest,
  DistanceMatrixResponse,
  distancematrix,
} from "./distance";
import { ElevationRequest, ElevationResponse, elevation } from "./elevation";
import {
  FindPlaceFromTextRequest,
  FindPlaceFromTextResponse,
  findPlaceFromText,
} from "./places/findplacefromtext";
import { GeocodeRequest, GeocodeResponse, geocode } from "./geocode/geocode";
import { GeolocateRequest, GeolocateResponse, geolocate } from "./geolocate";
import {
  NearestRoadsRequest,
  NearestRoadsResponse,
  nearestRoads,
} from "./roads/nearestroads";
import {
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse,
  placeAutocomplete,
} from "./places/autocomplete";
import {
  PlaceDetailsRequest,
  PlaceDetailsResponse,
  placeDetails,
} from "./places/details";
import {
  PlacePhotoRequest,
  PlacePhotoResponse,
  placePhoto,
} from "./places/photo";
import {
  PlaceQueryAutocompleteRequest,
  PlaceQueryAutocompleteResponse,
  placeQueryAutocomplete,
} from "./places/queryautocomplete";
import {
  PlacesNearbyRequest,
  PlacesNearbyResponse,
  placesNearby,
} from "./places/placesnearby";
import {
  ReverseGeocodeRequest,
  ReverseGeocodeResponse,
  reverseGeocode,
} from "./geocode/reversegeocode";
import {
  SnapToRoadsRequest,
  SnapToRoadsResponse,
  snapToRoads,
} from "./roads/snaptoroads";
import {
  TextSearchRequest,
  TextSearchResponse,
  textSearch,
} from "./places/textsearch";
import { TimeZoneRequest, TimeZoneResponse, timezone } from "./timezone";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { HttpsAgent } from "agentkeepalive";
import { customAdapter } from "./adapter";

// Cannot be `import` as it's not under TS root dir
export const version = require("../package.json").version;
export const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
export const defaultTimeout = 10000;
export const userAgent = `google-maps-services-node-${version}`;
export const acceptEncoding = "gzip";
export const X_GOOG_MAPS_EXPERIENCE_ID = "X-GOOG-MAPS-EXPERIENCE-ID";

const defaultConfig: AxiosRequestConfig = {
  timeout: defaultTimeout,
  httpsAgent: defaultHttpsAgent,
  adapter: customAdapter,
  headers: {
    "User-Agent": userAgent,
    "Accept-Encoding": acceptEncoding,
  },
};

export const defaultAxiosInstance = axios.create(defaultConfig);
rax.attach(defaultAxiosInstance);

export type Config = {
  raxConfig?: rax.RetryConfig;
} & AxiosRequestConfig;

export interface ClientOptions {
  /** AxiosInstance to be used by client. Provide one of axiosInstance or config. */
  axiosInstance?: AxiosInstance;
  /** Config used to create AxiosInstance. Provide one of axiosInstance or config. */
  config?: Config;
  experienceId?: string[];
}
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
export class Client {
  private axiosInstance: AxiosInstance;
  private experienceId: string[];

  constructor({ axiosInstance, config, experienceId }: ClientOptions = {}) {
    if (axiosInstance && config) {
      throw new Error("Provide one of axiosInstance or config.");
    }

    if (axiosInstance) {
      this.axiosInstance = axiosInstance;
      this.axiosInstance.defaults.headers = {
        ...defaultConfig.headers,
        ...this.axiosInstance.defaults.headers,
      };
    } else if (config) {
      config = { ...defaultConfig, ...config };
      config.headers = { ...defaultConfig.headers, ...(config.headers || {}) };
      this.axiosInstance = axios.create(config);
      rax.attach(this.axiosInstance);
    } else {
      this.axiosInstance = defaultAxiosInstance;
    }

    if (experienceId) {
      this.setExperienceId(...experienceId);
    }
  }

  setExperienceId(...ids: string[]) {
    this.experienceId = ids;
    this.axiosInstance.defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID] = ids.join(
      ","
    );
  }

  clearExperienceId() {
    this.experienceId = null;
    this.clearExperienceIdHeader();
  }

  private clearExperienceIdHeader() {
    delete this.axiosInstance.defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID];
  }

  getExperienceId(): string[] {
    return this.experienceId;
  }

  directions(request: DirectionsRequest): Promise<DirectionsResponse> {
    return directions(request, this.axiosInstance);
  }

  distancematrix(
    request: DistanceMatrixRequest
  ): Promise<DistanceMatrixResponse> {
    return distancematrix(request, this.axiosInstance);
  }

  elevation(request: ElevationRequest): Promise<ElevationResponse> {
    return elevation(request, this.axiosInstance);
  }

  timezone(request: TimeZoneRequest): Promise<TimeZoneResponse> {
    return timezone(request, this.axiosInstance);
  }
  geolocate(request: GeolocateRequest): Promise<GeolocateResponse> {
    return geolocate(request, this.axiosInstance);
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
   *   console.log(`First result is: ${str}`);)
   * });
   * ```
   */
  geocode(request: GeocodeRequest): Promise<GeocodeResponse> {
    return geocode(request, this.axiosInstance);
  }

  reverseGeocode(
    request: ReverseGeocodeRequest
  ): Promise<ReverseGeocodeResponse> {
    return reverseGeocode(request, this.axiosInstance);
  }

  placeAutocomplete(
    request: PlaceAutocompleteRequest
  ): Promise<PlaceAutocompleteResponse> {
    return placeAutocomplete(request, this.axiosInstance);
  }

  placeDetails(request: PlaceDetailsRequest): Promise<PlaceDetailsResponse> {
    return placeDetails(request, this.axiosInstance);
  }

  findPlaceFromText(
    request: FindPlaceFromTextRequest
  ): Promise<FindPlaceFromTextResponse> {
    return findPlaceFromText(request, this.axiosInstance);
  }

  placePhoto(request: PlacePhotoRequest): Promise<PlacePhotoResponse> {
    return placePhoto(request, this.axiosInstance);
  }

  placesNearby(request: PlacesNearbyRequest): Promise<PlacesNearbyResponse> {
    return placesNearby(request, this.axiosInstance);
  }

  placeQueryAutocomplete(
    request: PlaceQueryAutocompleteRequest
  ): Promise<PlaceQueryAutocompleteResponse> {
    return placeQueryAutocomplete(request, this.axiosInstance);
  }

  textSearch(request: TextSearchRequest): Promise<TextSearchResponse> {
    return textSearch(request, this.axiosInstance);
  }
  nearestRoads(request: NearestRoadsRequest): Promise<NearestRoadsResponse> {
    return nearestRoads(request, this.axiosInstance);
  }
  snapToRoads(request: SnapToRoadsRequest): Promise<SnapToRoadsResponse> {
    return snapToRoads(request, this.axiosInstance);
  }
}

export {
  DirectionsRequest,
  DirectionsResponse,
  DistanceMatrixRequest,
  DistanceMatrixResponse,
  ElevationRequest,
  ElevationResponse,
  FindPlaceFromTextRequest,
  FindPlaceFromTextResponse,
  GeolocateRequest,
  GeocodeRequest,
  GeocodeResponse,
  GeolocateResponse,
  NearestRoadsRequest,
  NearestRoadsResponse,
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse,
  PlaceDetailsRequest,
  PlaceDetailsResponse,
  PlacePhotoRequest,
  PlacePhotoResponse,
  PlaceQueryAutocompleteRequest,
  PlaceQueryAutocompleteResponse,
  PlacesNearbyRequest,
  PlacesNearbyResponse,
  ReverseGeocodeRequest,
  ReverseGeocodeResponse,
  SnapToRoadsRequest,
  SnapToRoadsResponse,
  TextSearchRequest,
  TextSearchResponse,
  TimeZoneRequest,
  TimeZoneResponse,
};
