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
import { LatLng, LatLngLiteral, ResponseData, RequestParams } from "./common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export interface PositionalElevationParams {
    /**
     * defines the location(s) on the earth from which to return elevation data.
     * This parameter takes either a single location as a comma-separated {latitude,longitude} pair (e.g. "40.714728,-73.998672")
     * or multiple latitude/longitude pairs passed as an array or as an encoded polyline.
     */
    locations: LatLng[];
}
export interface SampledPathElevationParams {
    /**
     * defines a path on the earth for which to return elevation data. This parameter defines a
     * set of two or more ordered pairs defining a path along the surface of the earth. This
     * parameter must be used in conjunction with the samples parameter described below.
     */
    path: LatLng[];
    /**
     * specifies the number of sample points along a path for which to return elevation data.
     * The samples parameter divides the given path into an ordered set of equidistant points
     * along the path.
     */
    samples: number;
}
export interface ElevationRequest extends Partial<AxiosRequestConfig> {
    params: (PositionalElevationParams | SampledPathElevationParams) & RequestParams;
}
export interface ElevationResponseData extends ResponseData {
    results: {
        /**
         * A `location` element (containing `lat` and `lng` elements) of the position for which elevation data is being computed.
         * Note that for path requests, the set of `location` elements will contain the sampled points along the path.
         */
        location: LatLngLiteral;
        /** An `elevation` element indicating the elevation of the location in meters. */
        elevation: number;
        /**
         * A `resolution` value, indicating the maximum distance between data points from which the elevation was interpolated, in meters.
         * This property will be missing if the resolution is not known.
         * Note that elevation data becomes more coarse (larger `resolution` values) when multiple points are passed.
         * To obtain the most accurate elevation value for a point, it should be queried independently.
         */
        resolution: number;
    }[];
}
export interface ElevationResponse extends AxiosResponse {
    data: ElevationResponseData;
}
export declare const defaultUrl = "https://maps.googleapis.com/maps/api/elevation/json";
export declare const defaultParamsSerializer: (params: Record<string, any>) => string;
export declare function elevation({ params, method, url, paramsSerializer, ...config }: ElevationRequest, axiosInstance?: AxiosInstance): Promise<ElevationResponse>;
