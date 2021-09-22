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

import { ResponseData, LatLng, Language, PlaceType1, Place, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

export interface TextSearchRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The text string on which to search, for example: "restaurant" or "123 Main Street".
     * The Google Places service will return candidate matches based on this string and order the results
     * based on their perceived relevance. This parameter becomes optional if the `type` parameter
     * is also used in the search request.
     */
    query: string;
    /**
     * The region code, specified as a ccTLD (country code top-level domain) two-character value.
     * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
     * This parameter will only influence, not fully restrict, search results.
     * If more relevant results exist outside of the specified region, they may be included.
     * When this parameter is used, the country name is omitted from the resulting `formatted_address`
     * for results in the specified region.
     */
    region?: string;
    /**
     * The latitude/longitude around which to retrieve place information.
     * This must be specified as latitude,longitude. If you specify a location parameter,
     * you must also specify a radius parameter.
     */
    location?: LatLng;
    /**
     * Defines the distance (in meters) within which to bias place results.
     * The maximum allowed radius is 50 000 meters.
     * Results inside of this region will be ranked higher than results outside of the search circle;
     * however, prominent results from outside of the search radius may be included.
     */
    radius?: number;
    /**
     * The language code, indicating in which language the results should be returned, if possible.
     * Note that we often update supported languages so this list may not be exhaustive
     */
    language?: Language;
    /**
     * Restricts results to only those places within the specified price level.
     * Valid values are in the range from 0 (most affordable) to 4 (most expensive), inclusive.
     * The exact amount indicated by a specific value will vary from region to region.
     */
    minprice?: number;
    /**
     * Restricts results to only those places within the specified price level.
     * Valid values are in the range from 0 (most affordable) to 4 (most expensive), inclusive.
     * The exact amount indicated by a specific value will vary from region to region.
     */
    maxprice?: number;
    /**
     * Returns only those places that are open for business at the time the query is sent.
     * Places that do not specify opening hours in the Google Places database will not be returned
     * if you include this parameter in your query.
     */
    opennow?: boolean;
    /**
     * Returns the next 20 results from a previously run search.
     * Setting a `pagetoken` parameter will execute a search with the same parameters used previously —
     * all parameters other than `pagetoken` will be ignored.
     */
    pagetoken?: string;
    /**
     * Restricts the results to places matching the specified type.
     * Only one type may be specified (if more than one type is provided, all types following the first entry are ignored).
     */
    type?: PlaceType1;
    } & RequestParams;
}

export interface TextSearchResponseData extends ResponseData {
  results: Place[];
}

export interface TextSearchResponse extends AxiosResponse {
  data: TextSearchResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";

export const defaultParamsSerializer = serializer({ location: latLngToString }, defaultUrl);

export function textSearch(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: TextSearchRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<TextSearchResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<TextSearchResponse>;
}
