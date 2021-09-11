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

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  DistanceMatrixRow,
  LatLng,
  RequestParams,
  ResponseData,
  TrafficModel,
  TransitMode,
  TransitRoutingPreference,
  TravelMode,
  TravelRestriction,
  UnitSystem
} from "./common";
import { latLngToString, serializer, toTimestamp } from "./serialize";

import { defaultAxiosInstance } from "./client";

export interface DistanceMatrixRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The starting point for calculating travel distance and time.
     * You can supply one or more locations separated by the pipe character (`|`), in the form of an address, latitude/longitude coordinates,
     * or a place ID:
     *  - If you pass an address, the service geocodes the string and converts it to a latitude/longitude coordinate to calculate distance.
     *    This coordinate may be different from that returned by the Geocoding API, for example a building entrance rather than its center.
     *
     *    `origins=Bobcaygeon+ON|24+Sussex+Drive+Ottawa+ON`
     *
     *  - If you pass latitude/longitude coordinates, they are used unchanged to calculate distance.
     *    Ensure that no space exists between the latitude and longitude values.
     *
     *    `origins=41.43206,-81.38992|-33.86748,151.20699`
     *
     *  - If you supply a place ID, you must prefix it with `place_id:`.
     *    You can only specify a place ID if the request includes an API key or a Google Maps APIs Premium Plan client ID.
     *    You can retrieve place IDs from the Geocoding API and the Places SDK (including Place Autocomplete).
     *
     *    `origins=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`
     *
     *  - Alternatively, you can supply an encoded set of coordinates using the
     *    [Encoded Polyline Algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm).
     *    This is particularly useful if you have a large number of origin points, because the URL is significantly shorter when using
     *    an encoded polyline.
     *
     *     - Encoded polylines must be prefixed with `enc:` and followed by a colon (`:`). For example: `origins=enc:gfo}EtohhU:`
     *     - You can also include multiple encoded polylines, separated by the pipe character (`|`).
     *       For example: `origins=enc:wc~oAwquwMdlTxiKtqLyiK:|enc:c~vnAamswMvlTor@tjGi}L:|enc:udymA{~bxM:`
     */
    origins: LatLng[];
    /**
     * One or more locations to use as the finishing point for calculating travel distance and time.
     * The options for the destinations parameter are the same as for the origins parameter, described above.
     */
    destinations: LatLng[];
    /**
     * Specifies the mode of transport to use when calculating distance.
     * Valid values and other request details are specified in the Travel Modes section of this document.
     *
     * @default TravelMode.driving
     */
    mode?: TravelMode;
    /**
     * The language in which to return results.
     *  - If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header,
     *    or the native language of the domain from which the request is sent.
     *  - The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal,
     *    it returns street addresses in the local language, transliterated to a script readable by the user if necessary,
     *    observing the preferred language. All other addresses are returned in the preferred language.
     *    Address components are all returned in the same language, which is chosen from the first component.
     *  - If a name is not available in the preferred language, the API uses the closest match.
     *  - The preferred language has a small influence on the set of results that the API chooses to return,
     *    and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
     *    such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
     *    For example, utca and tér are synonyms for street in Hungarian.
     */
    language?: string;
    /**
     * The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/CcTLD) (country code top-level domain) two-character value.
     * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
     * This parameter will only influence, not fully restrict, results from the geocoder.
     * If more relevant results exist outside of the specified region, they may be included.
     */
    region?: string;
    /**
     * Introduces restrictions to the route. Valid values are specified in the Restrictions section of this document.
     * Only one restriction can be specified.
     */
    avoid?: TravelRestriction[];
    /** Specifies the unit system to use when expressing distance as text. */
    units?: UnitSystem;
    /**
     * Specifies the desired time of arrival for transit requests, in seconds since midnight, January 1, 1970 UTC.
     * You can specify either `departure_time` or `arrival_time`, but not both.
     * Note that `arrival_time` must be specified as an integer.
     */
    arrival_time?: Date | number;
    /**
     * The desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
     * Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).
     *
     * The departure time may be specified in two cases:
     *
     *  - For requests where the travel mode is transit: You can optionally specify one of `departure_time` or `arrival_time`.
     *    If neither time is specified, the `departure_time` defaults to now (that is, the departure time defaults to the current time).
     *
     *  - For requests where the travel mode is driving: You can specify the `departure_time` to receive a route and trip duration
     *    (response field: `duration_in_traffic`) that take traffic conditions into account.
     *    This option is only available if the request contains a valid API key, or a valid
     *    Google Maps APIs Premium Plan client ID and signature.
     *    The `departure_time` must be set to the current time or some time in the future. It cannot be in the past.
     *
     *    **Note:** Distance Matrix requests specifying `departure_time` when `mode=driving` are limited
     *    to a maximum of 100 elements per request. The number of origins times the number of destinations defines the number of elements.
     */
    departure_time?: Date | number;
    /**
     * Specifies the assumptions to use when calculating time in traffic.
     * This setting affects the value returned in the `duration_in_traffic` field in the response,
     * which contains the predicted time in traffic based on historical averages.
     * The `traffic_model` parameter may only be specified for requests where the travel mode is `driving`,
     * and where the request includes a `departure_time`, and only if the request includes an API key or
     * a Google Maps APIs Premium Plan client ID.
     *
     * @default TrafficModel.best_guess
     */
    traffic_model?: TrafficModel;
    /** Specifies one or more preferred modes of transit. This parameter may only be specified for requests where the `mode` is `transit`. */
    transit_mode?: TransitMode[];
    /**
     * Specifies preferences for transit requests. Using this parameter, you can bias the options returned,
     * rather than accepting the default best route chosen by the API.
     * This parameter may only be specified for requests where the `mode` is `transit`.
     */
    transit_routing_preference?: TransitRoutingPreference;
  } & RequestParams;
}

export interface DistanceMatrixResponseData extends ResponseData {
  origin_addresses: string[];
  /**
   * contains an array of addresses as returned by the API from your original request.
   * As with origin_addresses, these are localized if appropriate.
   */
  destination_addresses: string[];
  /** contains an array of elements, which in turn each contain a status, duration, and distance element. */
  rows: DistanceMatrixRow[];
}

export interface DistanceMatrixResponse extends AxiosResponse {
  data: DistanceMatrixResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/distancematrix/json";

export const defaultParamsSerializer = serializer({
  origins: o => o.map(latLngToString),
  destinations: o => o.map(latLngToString),
  arrival_time: toTimestamp,
  departure_time: toTimestamp
}, defaultUrl);

export function distancematrix(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: DistanceMatrixRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<DistanceMatrixResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<DistanceMatrixResponse>;
}
