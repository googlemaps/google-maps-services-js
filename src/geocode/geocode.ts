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

import {
  LatLngBounds,
  GeocodeResult,
  ResponseData,
  RequestParams,
} from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngBoundsToString, objectToString } from "../serialize";

export const defaultUrl = "https://maps.googleapis.com/maps/api/geocode/json";

export interface GeocodeComponents {
  /** matches `postal_code` and `postal_code_prefix`. */
  postal_code?: string;
  /**
   * matches a country name or a two letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code.
   * **Note:** The API follows the ISO standard for defining countries, and the filtering works best when using
   * the corresponding ISO code of the country
   */
  country?: string;
  /** matches the long or short name of a route. */
  route?: string;
  /** matches against `locality` and `sublocality` types. */
  locality?: string;
  /** matches all the administrative_area levels. */
  administrative_area?: string;
}

export interface GeocodeRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The place_id that you want to geocode. You can retrieve this information from Places API for example.
     */
    place_id?: string;
    /**
     * The street address that you want to geocode, in the format used by the national postal service of the country concerned.
     * Additional address elements such as business names and unit, suite or floor numbers should be avoided.
     */
    address?: string;
    /**
     * The bounding box of the viewport within which to bias geocode results more prominently.
     * This parameter will only influence, not fully restrict, results from the geocoder.
     */
    bounds?: string | LatLngBounds;
    /**
     * The language in which to return results.
     *  - If `language` is not supplied, the geocoder attempts to use the preferred language as specified in the `Accept-Language` header,
     *    or the native language of the domain from which the request is sent.
     *  - The geocoder does its best to provide a street address that is readable for both the user and locals.
     *    To achieve that goal, it returns street addresses in the local language, transliterated to a script readable
     *    by the user if necessary, observing the preferred language. All other addresses are returned in the preferred language.
     *    Address components are all returned in the same language, which is chosen from the first component.
     *  - If a name is not available in the preferred language, the geocoder uses the closest match.
     *  - The preferred language has a small influence on the set of results that the API chooses to return,
     *    and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
     *    such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
     *    For example, utca and tér are synonyms for street in Hungarian.
     */
    language?: string;
    /**
     * The region code, specified as a ccTLD ("top-level domain") two-character value.
     * This parameter will only influence, not fully restrict, results from the geocoder.
     */
    region?: string;
    /**
     * A components filter with elements separated by a pipe (`|`).
     * The components filter is *required* if the request doesn't include an `address`.
     * Each element in the components filter consists of a `component:value` pair, and fully restricts the results from the geocoder.
     */
    components?: string | GeocodeComponents;
  } & RequestParams;
}

export interface GeocodeResponseData extends ResponseData {
  /**
   * contains an array of geocoded address information and geometry information.
   *
   * Generally, only one entry in the `"results"` array is returned for address lookups,though the geocoder may return several results
   * when address queries are ambiguous.
   */
  results: GeocodeResult[];
}

export interface GeocodeResponse extends AxiosResponse {
  data: GeocodeResponseData;
}

export const defaultParamsSerializer = serializer(
  {
    bounds: latLngBoundsToString,
    components: objectToString,
  },
  defaultUrl
);

export function geocode(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: GeocodeRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<GeocodeResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config,
  }) as Promise<GeocodeResponse>;
}
