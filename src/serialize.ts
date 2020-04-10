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
import { stringify as qs } from "query-string";

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
    .map(x => {
      return x.toString();
    })
    .join(",");
}

export function objectToString(o: string | object): string {
  if (typeof o === "string") {
    return o;
  } else {
    let keys = Object.keys(o);
    keys.sort();
    return keys.map(k => k + ":" + o[k]).join(separator);
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
  queryStringOptions: object = {
    arrayFormat: "separator",
    arrayFormatSeparator: separator
  }
) {
  return (params: { [key: string]: any }) => {
    Object.keys(format).forEach((key: string) => {
      if (key in params) {
        params[key] = format[key](params[key]);
      }
    });
    return qs(params, queryStringOptions);
  };
}

export function toTimestamp(o: number | Date) {
  if (o instanceof Date) {
    return Number(o) / 1000;
  }
  return o
}
