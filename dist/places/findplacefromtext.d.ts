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
import { Language, ResponseData, Place, PlaceInputType, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export interface FindPlaceFromTextRequest extends Partial<AxiosRequestConfig> {
    params: {
        /** The text input specifying which place to search for (for example, a name, address, or phone number). */
        input: string;
        /** The type of input. This can be one of either `textQuery` or `phoneNumber`. */
        inputtype: PlaceInputType;
        /**
         * The language code, indicating in which language the results should be returned, if possible.
         * Searches are also biased to the selected language; results in the selected language may be given a higher ranking
         */
        language?: Language;
        /**
         * The fields specifying the types of place data to return.
         *
         * **Note:** If you omit the fields parameter from a Find Place request, only the place_id for the result will be returned.
         */
        fields?: string[];
        /**
         * Prefer results in a specified area, by specifying either a radius plus lat/lng, or two lat/lng pairs representing
         * the points of a rectangle. If this parameter is not specified, the API uses IP address biasing by default.
         */
        locationbias?: string;
    } & RequestParams;
}
export interface FindPlaceFromTextResponseData extends ResponseData {
    candidates: Place[];
}
export interface FindPlaceFromTextResponse extends AxiosResponse {
    data: FindPlaceFromTextResponseData;
}
export declare const defaultUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
export declare const defaultParamsSerializer: (params: Record<string, any>) => string;
export declare function findPlaceFromText({ params, method, url, paramsSerializer, ...config }: FindPlaceFromTextRequest, axiosInstance?: AxiosInstance): Promise<FindPlaceFromTextResponse>;
