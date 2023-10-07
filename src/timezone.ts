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
import { Language, LatLng, RequestParams, ResponseData } from "./common";
import { latLngToString, serializer, toTimestamp } from "./serialize";

import { defaultAxiosInstance } from "./client";

export interface TimeZoneRequest extends Partial<AxiosRequestConfig> {
  params: {
    /** a comma-separated `lat,lng` tuple (eg. `location=-33.86,151.20`), representing the location to look up. */
    location: LatLng;
    /**
     * specifies the desired time as seconds since midnight, January 1, 1970 UTC.
     * The Time Zone API uses the timestamp to determine whether or not Daylight Savings should be applied,
     * based on the time zone of the location. Note that the API does not take historical time zones into account.
     * That is, if you specify a past timestamp, the API does not take into account the possibility that
     * the location was previously in a different time zone.
     */
    timestamp: Date | number;
    /**
     * The language in which to return results.
     * Note that we often update supported languages so this list may not be exhaustive.
     *
     * @default Language.English
     */
    language?: Language;
  } & RequestParams;
}

export interface TimeZoneResponseData extends ResponseData {
  /**
   * the offset for daylight-savings time in seconds.
   * This will be zero if the time zone is not in Daylight Savings Time during the specified `timestamp`.
   */
  dstOffset: number;
  /** the offset from UTC (in seconds) for the given location. This does not take into effect daylight savings. */
  rawOffset: number;
  /**
   * a string containing the ID of the time zone, such as "America/Los_Angeles" or "Australia/Sydney".
   * These IDs are defined by [Unicode Common Locale Data Repository (CLDR) project](http://cldr.unicode.org/),
   * and currently available in file [timezone.xml](http://unicode.org/repos/cldr/trunk/common/bcp47/timezone.xml).
   * When a timezone has several IDs, the canonical one is returned. In timezone.xml, this is the first alias of each timezone.
   * For example, "Asia/Calcutta" is returned, not "Asia/Kolkata".
   */
  timeZoneId: string;
  /**
   * a string containing the long form name of the time zone.
   * This field will be localized if the `language` parameter is set.
   * eg. "Pacific Daylight Time" or "Australian Eastern Daylight Time"
   */
  timeZoneName: string;
}

export interface TimeZoneResponse extends AxiosResponse {
  data: TimeZoneResponseData;
}

export const defaultUrl = "https://maps.googleapis.com/maps/api/timezone/json";
export const defaultParamsSerializer = serializer(
  {
    timestamp: toTimestamp,
    location: latLngToString,
  },
  defaultUrl
);
export function timezone(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: TimeZoneRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<TimeZoneResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config,
  }) as Promise<TimeZoneResponse>;
}
