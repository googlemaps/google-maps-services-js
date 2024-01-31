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
import { LatLng, SnappedPoint, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export interface NearestRoadsRequest extends Partial<AxiosRequestConfig> {
    params: {
        /**
         * A list of latitude/longitude pairs. Latitude and longitude values should be separated by commas.
         * Coordinates should be separated by the pipe character: "|".
         * For example: `points=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796`.
         */
        points: LatLng[];
    } & RequestParams;
}
export interface NearestRoadsResponse extends AxiosResponse {
    data: {
        /** An array of snapped points. */
        snappedPoints: SnappedPoint[];
    };
}
export declare const defaultUrl = "https://roads.googleapis.com/v1/nearestRoads";
export declare const defaultParamsSerializer: (params: Record<string, any>) => string;
export declare function nearestRoads({ params, method, url, paramsSerializer, ...config }: NearestRoadsRequest, axiosInstance?: AxiosInstance): Promise<NearestRoadsResponse>;
