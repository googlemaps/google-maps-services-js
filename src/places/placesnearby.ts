import { Language, LatLng, ResponseData, Place, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

export type PlacesNearbyRanking =
  /**
   * This option sorts results based on their importance. Ranking will favor prominent places within the specified area.
   * Prominence can be affected by a place's ranking in Google's index, global popularity, and other factors.
   */
  | "prominence"
  /**
   * This option biases search results in ascending order by their distance from the specified `location`.
   * When distance is specified, one or more of `keyword`, `name`, or `type` is required.
   */
  | "distance";

export interface PlacesNearbyRequest extends Partial<AxiosRequestConfig> {
  params: {
    /** The latitude/longitude around which to retrieve place information. This must be specified as latitude,longitude. */
    location: LatLng;
    /**
     * Defines the distance (in meters) within which to return place results.
     * The maximum allowed radius is 50 000 meters.
     * Note that `radius` must not be included if `rankby=distance` is specified.
     */
    radius?: number;
    /**
     * A term to be matched against all content that Google has indexed for this place, including but not limited to
     * name, type, and address, as well as customer reviews and other third-party content.
     */
    keyword?: string;
    /**
     * The language code, indicating in which language the results should be returned, if possible.
     * Note that we often update supported languages so this list may not be exhaustive.
     */
    language?: Language;
    /**
     * Restricts results to only those places within the specified range.
     * Valid values range between 0 (most affordable) to 4 (most expensive), inclusive.
     * The exact amount indicated by a specific value will vary from region to region.
     */
    minprice?: number;
    /**
     * Restricts results to only those places within the specified range.
     * Valid values range between 0 (most affordable) to 4 (most expensive), inclusive.
     * The exact amount indicated by a specific value will vary from region to region.
     */
    maxprice?: number;
    /**
     * A term to be matched against all content that Google has indexed for this place.
     * Equivalent to `keyword`. The `name` field is no longer restricted to place names.
     * Values in this field are combined with values in the `keyword` field and passed as part of the same search string.
     * We recommend using only the `keyword` parameter for all search terms.
     */
    name?: string;
    /**
     * Returns only those places that are open for business at the time the query is sent.
     * Places that do not specify opening hours in the Google Places database will not be returned if you include this parameter in your query.
     */
    opennow?: boolean;
    /**
     * Specifies the order in which results are listed.
     * Note that `rankby` must not be included if `radius` is specified.
     *
     * @default PlacesNearbyRanking.prominence
     */
    rankby?: PlacesNearbyRanking;
    /**
     * Restricts the results to places matching the specified type.
     * Only one type may be specified (if more than one type is provided, all types following the first entry are ignored).
     */
    type?: string;
    /**
     * Returns the next 20 results from a previously run search.
     * Setting a pagetoken parameter will execute a search with the same parameters used previously —
     * all parameters other than pagetoken will be ignored.
     */
    pagetoken?: string;
    } & RequestParams;
}

export interface PlacesNearbyResponseData extends ResponseData {
  results: Place[];
}

export interface PlacesNearbyResponse extends AxiosResponse {
  data: PlacesNearbyResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export const defaultParamsSerializer = serializer({ location: latLngToString });

export function placesNearby(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: PlacesNearbyRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<PlacesNearbyResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<PlacesNearbyResponse>;
}
