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
  DirectionsRoute,
  GeocodedWaypoint,
  Language,
  LatLng,
  RequestParams,
  ResponseData,
  TrafficModel,
  TransitMode,
  TransitRoutingPreference,
  TravelMode,
  TravelRestriction,
  UnitSystem,
} from "./common";
import { latLngToString, serializer, toTimestamp } from "./serialize";

import { defaultAxiosInstance } from "./client";

export interface DirectionsRequest extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The address, textual latitude/longitude value, or place ID from which you wish to calculate directions.
     *  - If you pass an address, the Directions service geocodes the string and converts it to a latitude/longitude coordinate
     *    to calculate directions. This coordinate may be different from that returned by the Geocoding API, for example a building
     *    entrance rather than its center.
     *
     *    `origin=24+Sussex+Drive+Ottawa+ON`
     *
     *  - If you pass coordinates, they are used unchanged to calculate directions. Ensure that no space exists between the latitude
     *    and longitude values.
     *
     *    `origin=41.43206,-81.38992`
     *
     *  - Place IDs must be prefixed with `place_id:`. The place ID may only be specified if the request includes an API key or a
     *    Google Maps APIs Premium Plan client ID. You can retrieve place IDs from the Geocoding API and the Places SDK
     *    (including Place Autocomplete). For an example using place IDs from Place Autocomplete, see [Place Autocomplete and
     *    Directions](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions).
     *
     *    `origin=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`
     */
    origin: LatLng;
    /**
     * The address, textual latitude/longitude value, or place ID to which you wish to calculate directions.
     * The options for the `destination` parameter are the same as for the `origin` parameter, described above
     */
    destination: LatLng;
    /**
     * Specifies the mode of transport to use when calculating directions
     *
     * @default TravelMode.driving
     */
    mode?: TravelMode;
    /**
     * Specifies an array of waypoints.
     * Waypoints alter a route by routing it through the specified location(s).
     * A waypoint is specified as a latitude/longitude coordinate, an encoded polyline, a place ID, or an address which will be geocoded.
     * Encoded polylines must be prefixed with `enc:` and followed by a colon (`:`). Place IDs must be prefixed with `place_id:`.
     * The place ID may only be specified if the request includes an API key or a Google Maps APIs Premium Plan client ID.
     * Waypoints are only supported for driving, walking and bicycling directions.
     */
    waypoints?: (string | LatLng)[];
    /**
     * If set to `true`, specifies that the Directions service may provide more than one route alternative in the response.
     * Note that providing route alternatives may increase the response time from the server.
     */
    alternatives?: boolean;
    /** Indicates that the calculated route(s) should avoid the indicated features. */
    avoid?: TravelRestriction[];
    /**
     * The language in which to return results.
     *
     *  - If `language` is not supplied, the API attempts to use the preferred language as specified in the `Accept-Language` header,
     *    or the native language of the domain from which the request is sent.
     *  - The API does its best to provide a street address that is readable for both the user and locals. To achieve that goal,
     *    it returns street addresses in the local language, transliterated to a script readable by the user if necessary,
     *    observing the preferred language. All other addresses are returned in the preferred language.
     *    Address components are all returned in the same language, which is chosen from the first component.
     *  - If a name is not available in the preferred language, the API uses the closest match.
     *  - The preferred language has a small influence on the set of results that the API chooses to return,
     *    and the order in which they are returned. The geocoder interprets abbreviations differently depending on language,
     *    such as the abbreviations for street types, or synonyms that may be valid in one language but not in another.
     *    For example, utca and tér are synonyms for street in Hungarian.
     */
    language?: Language;
    /** Specifies the unit system to use when displaying results. */
    units?: UnitSystem;
    /** Specifies the region code, specified as a ccTLD ("top-level domain") two-character value. */
    region?: string;
    /**
     * Specifies the desired time of arrival for transit directions, in seconds since midnight, January 1, 1970 UTC.
     * You can specify either `departure_time` or `arrival_time`, but not both.
     * Note that `arrival_time` must be specified as an integer.
     */
    arrival_time?: Date | number;
    /**
     * Specifies the desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC.
     * Alternatively, you can specify a value of `now`, which sets the departure time to the current time (correct to the nearest second).
     *
     * The departure time may be specified in two cases:
     *  - For requests where the travel mode is transit: You can optionally specify one of `departure_time` or `arrival_time`.
     *    If neither time is specified, the `departure_time` defaults to now (that is, the departure time defaults to the current time).
     *  - For requests where the travel mode is driving: You can specify the `departure_time` to receive a route and trip duration
     *    (response field: `duration_in_traffic`) that take traffic conditions into account.
     *    This option is only available if the request contains a valid API key, or a valid Google Maps APIs Premium Plan client ID
     *    and signature. The `departure_time` must be set to the current time or some time in the future. It cannot be in the past.
     */
    departure_time?: Date | number | "now";
    /**
     * Specifies the assumptions to use when calculating time in traffic.
     * This setting affects the value returned in the `duration_in_traffic` field in the response, which contains the predicted time
     * in traffic based on historical averages. The `traffic_model` parameter may only be specified for driving directions
     * where the request includes a `departure_time`, and only if the request includes an API key or a Google Maps APIs Premium Plan client ID.
     *
     * The default value of `best_guess` will give the most useful predictions for the vast majority of use cases.
     * It is possible the `best_guess` travel time prediction may be *shorter* than `optimistic`, or alternatively,
     * *longer* than `pessimistic`, due to the way the `best_guess` prediction model integrates live traffic information.
     *
     * @default TrafficModel.best_guess
     */
    traffic_model?: TrafficModel;
    /**
     * Specifies one or more preferred modes of transit.
     * This parameter may only be specified for transit directions, and only if the request includes an API key or
     * a Google Maps APIs Premium Plan client ID.
     */
    transit_mode?: TransitMode[];
    /**
     * Specifies preferences for transit routes.
     * Using this parameter, you can bias the options returned, rather than accepting the default best route chosen by the API.
     * This parameter may only be specified for transit directions, and only if the request includes an API key or
     * a Google Maps APIs Premium Plan client ID.
     */
    transit_routing_preference?: TransitRoutingPreference;
    /** Wherever to optimize the provided route by rearranging the waypoints in a more efficient order. */
    optimize?: boolean;
  } & RequestParams;
}
export interface DirectionsResponseData extends ResponseData {
  /**
   * contains an array with details about the geocoding of origin, destination and waypoints.
   *
   * These details will not be present for waypoints specified as textual latitude/longitude values if the service returns no results.
   * This is because such waypoints are only reverse geocoded to obtain their representative address after a route has been found.
   * An empty JSON object will occupy the corresponding places in the `geocoded_waypoints` array.
   */
  geocoded_waypoints: GeocodedWaypoint[];
  /**
   * contains an array of routes from the origin to the destination.
   *
   * When the Directions API returns results, it places them within a (JSON) `routes` array. Even if the service returns no results
   * (such as if the origin and/or destination doesn't exist) it still returns an empty `routes` array.
   * (XML responses consist of zero or more `<route>` elements.)
   *
   * Each element of the `routes` array contains a single result from the specified origin and destination.
   * This route may consist of one or more `legs` depending on whether any waypoints were specified.
   * As well, the route also contains copyright and warning information which must be displayed to the user in addition to the
   * routing information.
   */
  routes: DirectionsRoute[];
  /**
   * contains an array of available travel modes. This field is returned when a request specifies a travel `mode` and gets no results.
   * The array contains the available travel modes in the countries of the given set of waypoints.
   * This field is not returned if one or more of the waypoints are `via:` waypoints.
   */
  available_travel_modes: string[];
}

export interface DirectionsResponse extends AxiosResponse {
  data: DirectionsResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/directions/json";

export const defaultParamsSerializer = serializer(
  {
    origin: latLngToString,
    destination: latLngToString,
    waypoints: (o) => o.map(latLngToString),
    arrival_time: toTimestamp,
    departure_time: toTimestamp,
  },
  defaultUrl
);

export function directions(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: DirectionsRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<DirectionsResponse> {
  const { optimize } = params;

  // optimize is passed as the first of the waypoint pipe array
  // &waypoints=optimize:true|Barossa+Valley,SA|Clare,SA|Connawarra,SA|McLaren+Vale,SA
  if (optimize) {
    params.waypoints = ["optimize:true", ...params.waypoints];
  }

  delete params.optimize;

  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config,
  }) as Promise<DirectionsResponse>;
}
