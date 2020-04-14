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

// Cannot be `import` as it's not under TS root dir
export const version = require("../package.json").version;

export { DirectionsRequest, DirectionsResponse } from "./directions";
export { DistanceMatrixRequest, DistanceMatrixResponse } from "./distance";
export { ElevationRequest, ElevationResponse } from "./elevation";
export {
  FindPlaceFromTextRequest,
  FindPlaceFromTextResponse
} from "./places/findplacefromtext";
export { GeocodeRequest, GeocodeResponse } from "./geocode/geocode";
export { GeolocateRequest, GeolocateResponse } from "./geolocate";
export {
  NearestRoadsRequest,
  NearestRoadsResponse
} from "./roads/nearestroads";
export {
  PlaceAutocompleteRequest,
  PlaceAutocompleteResponse
} from "./places/autocomplete";
export { PlaceDetailsRequest, PlaceDetailsResponse } from "./places/details";
export { PlacePhotoRequest, PlacePhotoResponse } from "./places/photo";
export {
  PlaceQueryAutocompleteRequest,
  PlaceQueryAutocompleteResponse
} from "./places/queryautocomplete";
export {
  PlacesNearbyRequest,
  PlacesNearbyResponse
} from "./places/placesnearby";
export {
  ReverseGeocodeRequest,
  ReverseGeocodeResponse
} from "./geocode/reversegeocode";
export { SnapToRoadsRequest, SnapToRoadsResponse } from "./roads/snaptoroads";
export { TextSearchRequest, TextSearchResponse } from "./places/textsearch";
export { TimeZoneRequest, TimeZoneResponse } from "./timezone";

export * from "./common";
export * from "./client";
