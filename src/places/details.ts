import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { Language, ResponseData, Place, RequestParams } from "../common";
import { defaultAxiosInstance } from "../client";
import { serializer } from "../serialize";

export interface PlaceDetailsRequest extends Partial<AxiosRequestConfig> {
  params: {
    /** A textual identifier that uniquely identifies a place, returned from a Place Search. */
    place_id: string;
    /**
     * The language code, indicating in which language the results should be returned, if possible.
     * Note that some fields may not be available in the requested language.
     * Note that we often update supported languages so this list may not be exhaustive.
     */
    language?: Language;
    /**
     * The region code, specified as a ccTLD (country code top-level domain) two-character value.
     * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
     * This parameter will only influence, not fully restrict, results.
     * If more relevant results exist outside of the specified region, they may be included.
     * When this parameter is used, the country name is omitted from the resulting `formatted_address`
     * for results in the specified region.
     */
    region?: string;
    /**
     * A random string which identifies an autocomplete session for billing purposes.
     * Use this for Place Details requests that are called following an autocomplete request in the same user session
     */
    sessiontoken?: string;
    /**
     * One or more fields, specifying the types of place data to return, separated by a comma.
     *
     * **Warning: If you do not specify at least one field with a request, or if you omit the **fields**
     * parameter from a request, ALL possible fields will be returned, and you will be billed accordingly.
     * This applies only to Place Details requests.
     */
    fields?: string[];
    } & RequestParams;
}
export interface PlaceDetailsResponseData extends ResponseData {
  result: Place;
  /** contains a set of attributions about this listing which must be displayed to the user. */
  html_attributions: string[];
}

export interface PlaceDetailsResponse extends AxiosResponse {
  data: PlaceDetailsResponseData;
}

/**
 * The `"status"` field within the place response object contains the status of the request,
 * and may contain debugging information to help you track down why the place request failed
 */
export type PlaceDetailsResponseStatus =
  /** indicates that no errors occurred; the place was successfully detected and at least one result was returned. */
  | "OK"
  /** indicates a server-side error; trying again may be successful. */
  | "UNKNOWN_ERROR"
  /**
   * indicates that the referenced location (place_id) was valid but no longer refers to a valid result.
   * This may occur if the establishment is no longer in business.
   */
  | "ZERO_RESULTS"
  /**
   * indicates any of the following:
   *  - You have exceeded the QPS limits.
   *  - The request is missing an API key.
   *  - Billing has not been enabled on your account.
   *  - The monthly $200 credit, or a self-imposed usage cap, has been exceeded.
   *  - The provided method of payment is no longer valid (for example, a credit card has expired).
   * See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) for more information
   * about how to resolve this error.
   */
  | "OVER_QUERY_LIMIT"
  /** indicates that your request was denied, generally because an invalid key parameter. */
  | "REQUEST_DENIED"
  /** generally indicates that the query (place_id) is missing. */
  | "INVALID_REQUEST"
  /** indicates that the referenced location (place_id) was not found in the Places database. */
  | "NOT_FOUND";

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/place/details/json";

export const defaultParamsSerializer = serializer({});

export function placeDetails(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: PlaceDetailsRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<PlaceDetailsResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<PlaceDetailsResponse>;
}
