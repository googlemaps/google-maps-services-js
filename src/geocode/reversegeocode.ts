import { LatLng, AddressType, Language, RequestParams } from "../common";
import { GeocodeResult, ResponseData } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

/**
 * If both `result_type` and `location_type` filters are present then the API returns only those results that match both the
 * `result_type` and the `location_type` values. If none of the filter values are acceptable, the API returns `ZERO_RESULTS`.
 */
export type ReverseGeocodingLocationType =
  /** returns only the addresses for which Google has location information accurate down to street address precision. */
  | "ROOFTOP"
  /**
   * returns only the addresses that reflect an approximation (usually on a road) interpolated between two precise points
   * (such as intersections). An interpolated range generally indicates that rooftop geocodes are unavailable for a street address.
   */
  | "RANGE_INTERPOLATED"
  /** returns only geometric centers of a location such as a polyline (for example, a street) or polygon (region). */
  | "GEOMETRIC_CENTER"
  /** returns only the addresses that are characterized as approximate. */
  | "APPROXIMATE";

export interface ReverseGeocodeRequest extends Partial<AxiosRequestConfig> {
  params: {
    /** The latitude and longitude values specifying the location for which you wish to obtain the closest, human-readable address. */
    latlng?: LatLng;
    /**
     * The place ID of the place for which you wish to obtain the human-readable address.
     * The place ID is a unique identifier that can be used with other Google APIs.
     * For example, you can use the `placeID` returned by the Roads API to get the address for a snapped point.
     * The place ID may only be specified if the request includes an API key or a Google Maps APIs Premium Plan client ID.
     */
    place_id?: string;
    /**
     * The language in which to return results.
     *  - Google often updates the supported languages, so this list may not be exhaustive.
     *  - If `language` is not supplied, the geocoder attempts to use the preferred language as specified in the
     *    `Accept-Language` header, or the native language of the domain from which the request is sent.
     *  - The geocoder does its best to provide a street address that is readable for both the user and locals.
     *    To achieve that goal, it returns street addresses in the local language, transliterated to a script readable by the user
     *    if necessary, observing the preferred language. All other addresses are returned in the preferred language.
     *    Address components are all returned in the same language, which is chosen from the first component.
     *  - If a name is not available in the preferred language, the geocoder uses the closest match.
     */
    language?: Language;
    /**
     * A filter of one or more address types, separated by a pipe (`|`).
     * If the parameter contains multiple address types, the API returns all addresses that match any of the types.
     * A note about processing: The `result_type` parameter does not restrict the search to the specified address type(s).
     * Rather, the `result_type` acts as a post-search filter: the API fetches all results for the specified `latlng`,
     * then discards those results that do not match the specified address type(s).
     * Note: This parameter is available only for requests that include an API key or a client ID.
     */
    result_type?: AddressType[];
    /**
     * A filter of one or more location types, separated by a pipe (`|`).
     * If the parameter contains multiple location types, the API returns all addresses that match any of the types.
     * A note about processing: The `location_type` parameter does not restrict the search to the specified location type(s).
     * Rather, the `location_type` acts as a post-search filter: the API fetches all results for the specified `latlng`,
     * then discards those results that do not match the specified location type(s).
     * Note: This parameter is available only for requests that include an API key or a client ID.
     */
    location_type?: ReverseGeocodingLocationType[];
    } & RequestParams;
}

export interface ReverseGeocodeResponseData extends ResponseData {
  /**
   * contains an array of geocoded address information and geometry information.
   *
   * Generally, only one entry in the `"results"` array is returned for address lookups,though the geocoder may return several results
   * when address queries are ambiguous.
   */
  results: GeocodeResult[];
}

export interface ReverseGeocodeResponse extends AxiosResponse {
  data: ReverseGeocodeResponseData;
}

export const defaultUrl = "https://maps.googleapis.com/maps/api/geocode/json";

export const defaultParamsSerializer = serializer({
  latlng: latLngToString
});

export function reverseGeocode(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: ReverseGeocodeRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<ReverseGeocodeResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<ReverseGeocodeResponse>;
}
