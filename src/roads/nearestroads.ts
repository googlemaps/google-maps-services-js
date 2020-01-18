import { LatLng, SnappedPoint, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

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

export const defaultUrl = "https://roads.googleapis.com/v1/nearestRoads";
export const defaultParamsSerializer = serializer({
  points: o => o.map(latLng => latLngToString(latLng))
});

export function nearestRoads(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: NearestRoadsRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<NearestRoadsResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<NearestRoadsResponse>;
}
