import { LatLng, LatLngBounds } from "./common";
import { stringify as qs } from "query-string";

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
    return keys.map(k => k + ":" + o[k]).join("|");
  }
}

export function latLngBoundsToString(latLngBounds: string | LatLngBounds) {
  if (typeof latLngBounds === "string") {
    return latLngBounds;
  } else {
    return (
      latLngToString(latLngBounds.southwest) +
      "|" +
      latLngToString(latLngBounds.northeast)
    );
  }
}

export type serializerFunction = (any) => string | number | boolean;
export type serializerFormat = { [key: string]: serializerFunction };

export function serializer(
  format: serializerFormat,
  queryStringOptions: object = {
    arrayFormat: "separator",
    arrayFormatSeparator: "|"
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
