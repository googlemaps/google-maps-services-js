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
import { defaultAxiosInstance } from "./client";
import {
  ExtraComputation,
  FallbackInfo,
  PolylineEncoding,
  PolylineQuality,
  ReferenceRoute,
  Route,
  RouteModifiers,
  RouteTrafficModel,
  RouteTravelMode,
  RouteUnits,
  RoutingPreference,
  TransitPreferences,
  Waypoint,
} from "./interfaces/routes";
import { GeocodedWaypoint, RequestParams, ResponseData } from "./common";

export const defaultUrl =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

export interface RoutesRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The waypoint for the origin location.
     */
    origin: Waypoint;

    /**
     * The waypoint for the destination location.
     */
    destination: Waypoint;

    /**
     * Specifies an array of intermediate waypoints.
     */
    intermediates?: Waypoint[];

    /**
     * Specifies the mode of transport to use when calculating routes.
     *
     * @default TravelMode.driving
     */
    travelMode?: RouteTravelMode;

    /**
     * Specifies preferences for routing.
     */
    routingPreference?: RoutingPreference;

    /**
     * Specifies the desired polyline quality.
     */
    polylineQuality?: PolylineQuality;

    /**
     * Specifies the desired polyline encoding.
     */
    polylineEncoding?: PolylineEncoding;

    /**
     * Specifies the desired time of departure.
     */
    departureTime?: Date | number | "now";

    /**
     * Specifies the desired time of arrival.
     */
    arrivalTime?: Date | number;

    /**
     * If set to `true`, specifies that the Routes API may provide more than one route alternative in the response.
     */
    computeAlternativeRoutes?: boolean;

    /**
     * Specifies conditions to avoid when calculating routes.
     */
    routeModifiers?: RouteModifiers;

    /**
     * The language in which to return results.
     */
    languageCode?: string;

    /** Specifies the region code, specified as a ccTLD ("top-level domain") two-character value. */
    regionCode?: string;

    /**
     * Specifies the unit system to use when displaying results.
     */
    units?: RouteUnits;

    /**
     * If set to `true`, the service attempts to minimize the overall cost of the route by re-ordering the specified intermediate waypoints.
     */
    optimizeWaypointOrder?: boolean;

    /**
     * Specifies one or more preferred reference routes to calculate as part of the request in addition to the default route.
     */
    requestedReferenceRoutes?: ReferenceRoute[];

    /**
     * Specifies a list of extra computations to perform while completing the request.
     */
    extraComputations?: ExtraComputation[];

    /**
     * Specifies the assumptions to use when calculating time in traffic.
     */
    trafficModel?: RouteTrafficModel;

    /**
     * Specifies preferences for transit routes.
     */
    transitPreferences?: TransitPreferences;
  };
  apiKey: RequestParams;
  fields?: string[];
}

export interface RoutesResponseData extends ResponseData {
  geocodingResults: {
    origin: GeocodedWaypoint;
    destination: GeocodedWaypoint;
    intermediates?: GeocodedWaypoint[];
  };
  routes: Route[];
  fallbackInfo?: FallbackInfo;
}

export interface RoutesResponse extends AxiosResponse {
  data: RoutesResponseData;
}

export function routes(
  {
    params,
    apiKey,
    fields,
    method = "post",
    url = defaultUrl,
    ...config
  }: RoutesRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<RoutesResponse> {
  const { optimizeWaypointOrder } = params;

  // Construct the request body with only defined properties
  const requestBody = Object.fromEntries(
    Object.entries({
      origin: params.origin,
      destination: params.destination,
      intermediates: params.intermediates,
      travelMode: params.travelMode,
      routingPreference: params.routingPreference,
      polylineQuality: params.polylineQuality,
      polylineEncoding: params.polylineEncoding,
      departureTime: params.departureTime,
      arrivalTime: params.arrivalTime,
      computeAlternativeRoutes: params.computeAlternativeRoutes,
      routeModifiers: params.routeModifiers,
      languageCode: params.languageCode,
      regionCode: params.regionCode,
      units: params.units,
      optimizeWaypointOrder: params.optimizeWaypointOrder,
      requestedReferenceRoutes: params.requestedReferenceRoutes,
      extraComputations: params.extraComputations,
      trafficModel: params.trafficModel,
      transitPreferences: params.transitPreferences,
    }).filter(([, value]) => value !== undefined)
  );

  config.headers = {
    ...config.headers,
    "X-Goog-FieldMask": (() => {
      if (fields) {
        return fields.join(",");
      }
      return config.headers && "X-Goog-FieldMask" in config.headers
        ? config.headers["X-Goog-FieldMask"]
        : "*";
    })(),
  };

  if (optimizeWaypointOrder) {
    config.headers["X-Goog-FieldMask"] +=
      ",routes.optimizedIntermediateWaypointIndex";
  }

  return axiosInstance({
    params: apiKey,
    method,
    url,
    data: requestBody,
    ...config,
  }) as Promise<RoutesResponse>;
}
