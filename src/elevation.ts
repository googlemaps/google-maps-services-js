import { LatLng, LatLngLiteral, ResponseData, RequestParams } from "./common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "./client";
import { serializer, latLngToString } from "./serialize";

export interface ElevationRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * defines the location(s) on the earth from which to return elevation data.
     * This parameter takes either a single location as a comma-separated {latitude,longitude} pair (e.g. "40.714728,-73.998672")
     * or multiple latitude/longitude pairs passed as an array or as an encoded polyline.
     */
    locations: LatLng[];
  } & RequestParams;
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

export const defaultUrl = "https://maps.googleapis.com/maps/api/elevation/json";

export const defaultParamsSerializer = serializer({
  locations: o => o.map(latLngToString)
});

export function elevation(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: ElevationRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<ElevationResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<ElevationResponse>;
}
