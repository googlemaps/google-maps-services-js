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

export * from "./client";
