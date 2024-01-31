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
import { DirectionsRequest, DirectionsResponse } from "./directions";
import { DistanceMatrixRequest, DistanceMatrixResponse } from "./distance";
import { ElevationRequest, ElevationResponse } from "./elevation";
import { FindPlaceFromTextRequest, FindPlaceFromTextResponse } from "./places/findplacefromtext";
import { GeocodeRequest, GeocodeResponse } from "./geocode/geocode";
import { GeolocateRequest, GeolocateResponse } from "./geolocate";
import { NearestRoadsRequest, NearestRoadsResponse } from "./roads/nearestroads";
import { PlaceAutocompleteRequest, PlaceAutocompleteResponse } from "./places/autocomplete";
import { PlaceDetailsRequest, PlaceDetailsResponse } from "./places/details";
import { PlacePhotoRequest, PlacePhotoResponse } from "./places/photo";
import { PlaceQueryAutocompleteRequest, PlaceQueryAutocompleteResponse } from "./places/queryautocomplete";
import { PlacesNearbyRequest, PlacesNearbyResponse } from "./places/placesnearby";
import { ReverseGeocodeRequest, ReverseGeocodeResponse } from "./geocode/reversegeocode";
import { SnapToRoadsRequest, SnapToRoadsResponse } from "./roads/snaptoroads";
import { TextSearchRequest, TextSearchResponse } from "./places/textsearch";
import { TimeZoneRequest, TimeZoneResponse } from "./timezone";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpsAgent } from "agentkeepalive";
export declare const version: any;
export declare const defaultHttpsAgent: HttpsAgent;
export declare const defaultTimeout = 10000;
export declare const userAgent: string;
export declare const acceptEncoding = "gzip";
export declare const X_GOOG_MAPS_EXPERIENCE_ID = "X-GOOG-MAPS-EXPERIENCE-ID";
export declare const defaultAxiosInstance: AxiosInstance;
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
export declare class Client {
    private readonly axiosInstance;
    private experienceId;
    constructor({ axiosInstance, config, experienceId }?: ClientOptions);
    setExperienceId(...ids: string[]): void;
    clearExperienceId(): void;
    getExperienceId(): string[];
    directions(request: DirectionsRequest): Promise<DirectionsResponse>;
    distancematrix(request: DistanceMatrixRequest): Promise<DistanceMatrixResponse>;
    elevation(request: ElevationRequest): Promise<ElevationResponse>;
    timezone(request: TimeZoneRequest): Promise<TimeZoneResponse>;
    geolocate(request: GeolocateRequest): Promise<GeolocateResponse>;
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
    geocode(request: GeocodeRequest): Promise<GeocodeResponse>;
    reverseGeocode(request: ReverseGeocodeRequest): Promise<ReverseGeocodeResponse>;
    placeAutocomplete(request: PlaceAutocompleteRequest): Promise<PlaceAutocompleteResponse>;
    placeDetails(request: PlaceDetailsRequest): Promise<PlaceDetailsResponse>;
    findPlaceFromText(request: FindPlaceFromTextRequest): Promise<FindPlaceFromTextResponse>;
    placePhoto(request: PlacePhotoRequest): Promise<PlacePhotoResponse>;
    placesNearby(request: PlacesNearbyRequest): Promise<PlacesNearbyResponse>;
    placeQueryAutocomplete(request: PlaceQueryAutocompleteRequest): Promise<PlaceQueryAutocompleteResponse>;
    textSearch(request: TextSearchRequest): Promise<TextSearchResponse>;
    nearestRoads(request: NearestRoadsRequest): Promise<NearestRoadsResponse>;
    snapToRoads(request: SnapToRoadsRequest): Promise<SnapToRoadsResponse>;
}
export { DirectionsRequest, DirectionsResponse, DistanceMatrixRequest, DistanceMatrixResponse, ElevationRequest, ElevationResponse, FindPlaceFromTextRequest, FindPlaceFromTextResponse, GeolocateRequest, GeocodeRequest, GeocodeResponse, GeolocateResponse, NearestRoadsRequest, NearestRoadsResponse, PlaceAutocompleteRequest, PlaceAutocompleteResponse, PlaceDetailsRequest, PlaceDetailsResponse, PlacePhotoRequest, PlacePhotoResponse, PlaceQueryAutocompleteRequest, PlaceQueryAutocompleteResponse, PlacesNearbyRequest, PlacesNearbyResponse, ReverseGeocodeRequest, ReverseGeocodeResponse, SnapToRoadsRequest, SnapToRoadsResponse, TextSearchRequest, TextSearchResponse, TimeZoneRequest, TimeZoneResponse, };
