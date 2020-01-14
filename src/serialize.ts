import { LatLng, LatLngBounds, LatLngLiteral } from "./common";
import { stringify as qs } from "query-string";
import { encodePath } from "./util";

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
