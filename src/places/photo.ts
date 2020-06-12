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
import { RequestParams } from "../common";
import { defaultAxiosInstance } from "../client";

export interface PlacePhotoRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * string identifier that uniquely identifies a photo.
     * Photo references are returned from either a Place Search or Place Details request.
     */
    photoreference: string;
    /**
     * Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service.
     * If the image is smaller than the values specified, the original image will be returned.
     * If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions,
     * restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
     */
    maxwidth?: number;
    /**
     * Specifies the maximum desired height or width, in pixels, of the image returned by the Place Photos service.
     * If the image is smaller than the values specified, the original image will be returned.
     * If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions,
     * restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between 1 and 1600.
     */
    maxheight?: number;
    } & RequestParams;
  responseType: 'arraybuffer' | 'blob' | 'stream';
}

/**
 * The response of a successful Place Photo request will be an image.
 * The type of the image will depend upon the type of the originally submitted photo.
 *
 * If your request exceeds your available quota, the server will return an HTTP 403 status to indicate that the quota has been exceeded.
 *
 * If the server is unable to understand your request, it will return HTTP 400 status, which indicates an invalid request.
 *
 * The most common reasons why you might see an invalid request include:
 *  - The submitted photo reference was incorrectly specified.
 *  - Your request did not include either a `maxwidth` or `maxheight` parameter.
 */
export interface PlacePhotoResponse extends AxiosResponse {}

export const defaultUrl = "https://maps.googleapis.com/maps/api/place/photo";

export function placePhoto(
  { params, method = "get", url = defaultUrl, responseType, ...config }: PlacePhotoRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<PlacePhotoResponse> {
  if (!responseType) {
    responseType = 'arraybuffer'
  }

  return axiosInstance({
    params,
    method,
    url,
    responseType,
    ...config
  }) as Promise<PlacePhotoResponse>;
}
