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
  CellTower,
  LatLngLiteral,
  RadioType,
  RequestParams,
  ResponseData,
  WifiAccessPoint
} from "./common";

import { defaultAxiosInstance } from "./client";

export interface GeolocateRequest extends Partial<AxiosRequestConfig> {
  data: {
    /** The mobile country code (MCC) for the device's home network. */
    homeMobileCountryCode?: number;
    /** The mobile network code (MNC) for the device's home network. */
    homeMobileNetworkCode?: number;
    /** The mobile radio type. While this field is optional, it should be included if a value is available, for more accurate results. */
    radioType?: RadioType;
    /** The carrier name. */
    carrier?: string;
    /**
     * Specifies whether to fall back to IP geolocation if wifi and cell tower signals are not available.
     * Defaults to `true`. Set `considerIp` to `false` to disable fall back.
     */
    considerIp?: boolean;
    /** An array of cell tower objects. */
    cellTowers?: CellTower[];
    /** An array of WiFi access point objects. */
    wifiAccessPoints?: WifiAccessPoint[];
  };
  params: {} & RequestParams;
}

export interface GeolocateResponseData extends ResponseData {
  /** The user's estimated latitude and longitude, in degrees. Contains one `lat` and one `lng` subfield. */
  location: LatLngLiteral;
  /** The accuracy of the estimated location, in meters. This represents the radius of a circle around the given location. */
  accuracy: number;
}
export interface GeolocateResponseSuccess extends AxiosResponse {
  data: GeolocateResponseData;
}

/**
 * In the case of an error, a standard format error response body will be returned
 * and the HTTP status code will be set to an error status.
 */
export interface GeolocateResponseError extends AxiosResponse {
  data: {
    error: {
      /** This is the same as the HTTP status of the response. */
      code: number;
      /** A short description of the error. */
      message: string;
      /**
       * A list of errors which occurred. Each error contains an identifier for the type of error (the `reason`)
       * and a short description (the `message`).
       */
      errors: {
        domain: string;
        reason: GeolocateErrorReason;
        message: string;
      }[];
    };
  };
}

export enum GeolocateErrorReason {
  /**
   * You have exceeded your daily limit.
   * Domain: usageLimits
   * Code: 403
   */
  dailyLimitExceeded = "dailyLimitExceeded",
  /**
   * Your API key is not valid for the Geolocate API. Please ensure that you've included the entire key,
   * and that you've either purchased the API or have enabled billing and activated the API to obtain the free quota.
   * Domain: usageLimits
   * Code: 400
   */
  keyInvalid = "keyInvalid",
  /**
   * You have exceeded the requests per second per user limit that you configured in the Google Cloud Platform Console.
   * This limit should be configured to prevent a single or small group of users from exhausting your daily quota,
   * while still allowing reasonable access to all users.
   * Domain: usageLimits
   * Code: 403
   */
  userRateLimitExceeded = "userRateLimitExceeded",
  /**
   * The request was valid, but no results were returned.
   * Domain: geolocation
   * Code: 404
   */
  notFound = "notFound",
  /**
   * The request body is not valid JSON. Refer to the Request Body section for details on each field.
   * Domain: global
   * Code: 400
   */
  parseError = "parseError",
}

export type GeolocateResponse =
  | GeolocateResponseSuccess
  | GeolocateResponseError;

export const defaultUrl = "https://www.googleapis.com/geolocation/v1/geolocate";

export function geolocate(
  { params, method = "post", url = defaultUrl, ...config }: GeolocateRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<GeolocateResponse> {
  return axiosInstance({
    params,
    method,
    url,
    ...config
  }) as Promise<GeolocateResponse>;
}
