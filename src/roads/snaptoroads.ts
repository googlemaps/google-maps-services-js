import {
  LatLng,
  SnappedPoint
} from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

export interface SnapToRoadsRequest extends AxiosRequestConfig {
  params?: {
    /**
     * The path to be snapped. The `path` parameter accepts a list of latitude/longitude pairs.
     * Latitude and longitude values should be separated by commas. Coordinates should be separated by the pipe character: `"|"`.
     * For example: `path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796`.
     *
     * **Note:** The snapping algorithm works best for points that are not too far apart.
     * If you observe odd snapping behavior, try creating paths that have points closer together.
     * To ensure the best snap-to-road quality, you should aim to provide paths on which consecutive pairs
     *  of points are within 300m of each other. This will also help in handling any isolated, long jumps between
     * consecutive points caused by GPS signal loss, or noise.
     */
    path: LatLng[];
    /**
     * Whether to interpolate a path to include all points forming the full road-geometry.
     * When true, additional interpolated points will also be returned, resulting in a path that smoothly follows
     * the geometry of the road, even around corners and through tunnels.
     * Interpolated paths will most likely contain more points than the original path.
     *
     * @default false
     */
    interpolate?: boolean;
  };
}

export interface SnapToRoadsResponse extends AxiosResponse {
  data: {
    /** An array of snapped points. */
    snappedPoints: SnappedPoint[];
  };
}
export const defaultUrl = "https://roads.googleapis.com/v1/snapToRoads";
export const defaultParamsSerializer = serializer({ path: (latLng) => latLngToString(latLng) })

export function snapToRoads(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: SnapToRoadsRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<SnapToRoadsResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<SnapToRoadsResponse>;
}
