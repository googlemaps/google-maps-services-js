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

import { LatLng, LatLngBounds, LatLngLiteral } from "./common";

import { encodePath } from "./util";
import { createSignature } from "@googlemaps/url-signature";
import queryString from "query-string";

const qs = queryString.stringify;

const separator = "|";

export function latLngToString(o: LatLng) {
  if (typeof o === "string") {
    return o;
  } else if (Array.isArray(o) && o.length === 2) {
    // no transformation
  } else if ("lat" in o && "lng" in o) {
    o = [o.lat, o.lng];
  } else if ("latitude" in o && "longitude" in o) {
    o = [o.latitude, o.longitude];
  } else {
    throw new TypeError();
  }

  return o
    .map((x) => {
      return x.toString();
    })
    .join(",");
}

export function objectToString(o: string | object): string {
  if (typeof o === "string") {
    return o;
  } else {
    const keys = Object.keys(o);
    keys.sort();
    return keys.map((k) => k + ":" + o[k]).join(separator);
  }
}

export function latLngBoundsToString(latLngBounds: string | LatLngBounds) {
  if (typeof latLngBounds === "string") {
    return latLngBounds;
  } else {
    return (
      latLngToString(latLngBounds.southwest) +
      separator +
      latLngToString(latLngBounds.northeast)
    );
  }
}

export function toLatLngLiteral(o: LatLng): LatLngLiteral {
  if (typeof o === "string") {
    const parts = o.split(",").map(Number);
    return { lat: parts[0], lng: parts[1] };
  } else if (Array.isArray(o) && o.length === 2) {
    const parts = o.map(Number);
    return { lat: parts[0], lng: parts[1] };
  } else if ("lat" in o && "lng" in o) {
    return o;
  } else if ("latitude" in o && "longitude" in o) {
    return { lat: o.latitude, lng: o.longitude };
  } else {
    throw new TypeError();
  }
}

export function latLngArrayToStringMaybeEncoded(o: string | LatLng[]): string {
  if (typeof o === "string") {
    return o;
  }

  const concatenated = o.map(latLngToString).join(separator);
  const encoded = `enc:${encodePath(o.map(toLatLngLiteral))}`;

  if (encoded.length < concatenated.length) {
    return encoded;
  }

  return concatenated;
}

export type serializerFunction = (any) => string | number | boolean;
export type serializerFormat = { [key: string]: serializerFunction };

export function serializer(
  format: serializerFormat,
  baseUrl: string,
  queryStringOptions: object = {
    arrayFormat: "separator",
    arrayFormatSeparator: separator,
  }
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (params: Record<string, any>) => {
    // avoid mutating params
    const serializedParams = { ...params };

    for (const key of Object.keys(format)) {
      if (key in serializedParams) {
        serializedParams[key] = format[key](serializedParams[key]);
      }
    }

    if (
      "client_id" in serializedParams &&
      "client_secret" in serializedParams
    ) {
      // Special case to handle premium plan signature
      return createPremiumPlanQueryString(
        serializedParams,
        queryStringOptions,
        baseUrl
      );
    }

    return qs(serializedParams, queryStringOptions);
  };
}

export function toTimestamp(o: "now" | number | Date): number | "now" {
  if (o === "now") {
    return o;
  }
  if (o instanceof Date) {
    return Math.round(Number(o) / 1000);
  }
  return o;
}

export function createPremiumPlanQueryString(
  serializedParams: { [key: string]: string },
  queryStringOptions: object,
  baseUrl: string
): string {
  serializedParams.client = serializedParams.client_id;
  const clientSecret = serializedParams.client_secret;
  delete serializedParams.client_id;
  delete serializedParams.client_secret;

  const partialQueryString = qs(serializedParams, queryStringOptions);
  const unsignedUrl = `${baseUrl}?${partialQueryString}`;
  const signature = createSignature(unsignedUrl, clientSecret);

  // The signature must come last
  return `${partialQueryString}&signature=${signature}`;
}
