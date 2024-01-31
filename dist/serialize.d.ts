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
export declare function latLngToString(o: LatLng): string;
export declare function objectToString(o: string | object): string;
export declare function latLngBoundsToString(latLngBounds: string | LatLngBounds): string;
export declare function toLatLngLiteral(o: LatLng): LatLngLiteral;
export declare function latLngArrayToStringMaybeEncoded(o: string | LatLng[]): string;
export type serializerFunction = (any: any) => string | number | boolean;
export type serializerFormat = {
    [key: string]: serializerFunction;
};
export declare function serializer(format: serializerFormat, baseUrl: string, queryStringOptions?: object): (params: Record<string, any>) => string;
export declare function toTimestamp(o: "now" | number | Date): number | "now";
export declare function createPremiumPlanQueryString(serializedParams: {
    [key: string]: string;
}, queryStringOptions: object, baseUrl: string): string;
