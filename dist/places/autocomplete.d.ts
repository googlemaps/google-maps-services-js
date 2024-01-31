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
import { AddressType, LatLng, PredictionSubstring, PredictionTerm, RequestParams, ResponseData, StructuredFormatting } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export declare enum PlaceAutocompleteType {
    /**
     * instructs the Place Autocomplete service to return only geocoding results, rather than business results.
     * Generally, you use this request to disambiguate results where the location specified may be indeterminate.
     */
    geocode = "geocode",
    /**
     * instructs the Place Autocomplete service to return only geocoding results with a precise address.
     * Generally, you use this request when you know the user will be looking for a fully specified address.
     */
    address = "address",
    /** instructs the Place Autocomplete service to return only business results. */
    establishment = "establishment",
    /**
     * the `(regions)` type collection instructs the Places service to return any result matching the following types:
     *  - `locality`
     *  - `sublocality`
     *  - `postal_code`
     *  - `country`
     *  - `administrative_area_level_1`
     *  - `administrative_area_level_2`
     */
    regions = "(regions)",
    /** the (cities) type collection instructs the Places service to return results that match `locality` or `administrative_area_level_3`. */
    cities = "(cities)"
}
export interface PlaceAutocompleteRequest extends Partial<AxiosRequestConfig> {
    params: {
        /**
         * The text string on which to search. The Place Autocomplete service will return candidate matches
         * based on this string and order results based on their perceived relevance.
         */
        input: string;
        /**
         * A random string which identifies an autocomplete
         * [session](https://developers.google.com/places/web-service/autocomplete#session_tokens) for billing purposes.
         * If this parameter is omitted from an autocomplete request, the request is billed independently
         */
        sessiontoken?: string;
        /**
         * The position, in the input term, of the last character that the service uses to match predictions.
         * For example, if the input is 'Google' and the `offset` is 3, the service will match on 'Goo'.
         * The string determined by the `offset` is matched against the first word in the input term only.
         * For example, if the input term is 'Google abc' and the offset is 3, the service will attempt to match against 'Goo abc'.
         * If no `offset` is supplied, the service will use the whole term.
         * The `offset` should generally be set to the position of the text caret.
         */
        offset?: number;
        /**
         * The origin point from which to calculate straight-line distance to the destination (returned as distance_meters).
         * If this value is omitted, straight-line distance will not be returned.
         */
        origin?: LatLng;
        /** The point around which you wish to retrieve place information. */
        location?: LatLng;
        /**
         * The distance (in meters) within which to return place results. Note that setting a radius biases results to the indicated area,
         * but may not fully restrict results to the specified area.
         */
        radius?: number;
        /**
         * The language code, indicating in which language the results should be returned, if possible.
         * Searches are also biased to the selected language; results in the selected language may be given a higher ranking.
         * See the list of supported languages and their codes.
         * Note that we often update supported languages so this list may not be exhaustive.
         * If language is not supplied, the Place Autocomplete service will attempt to use the native language
         * of the domain from which the request is sent.
         */
        language?: string;
        /** The types of place results to return. */
        types?: PlaceAutocompleteType;
        /**
         * A grouping of places to which you would like to restrict your results.
         * Currently, you can use `components` to filter by up to 5 countries.
         * Countries must be passed as a two character, ISO 3166-1 Alpha-2 compatible country code.
         * For example: `components=country:fr` would restrict your results to places within France.
         * Multiple countries must be passed as multiple `country:XX` filters, with the pipe character (`|`) as a separator.
         * For example: `components=country:us|country:pr|country:vi|country:gu|country:mp` would restrict your results
         * to places within the United States and its unincorporated organized territories.
         */
        components?: string[];
        /**
         * Returns only those places that are strictly within the region defined by `location` and `radius`.
         * This is a restriction, rather than a bias, meaning that results outside this region
         * will not be returned even if they match the user input.
         */
        strictbounds?: boolean;
    } & RequestParams;
}
export interface PlaceAutocompleteResult {
    /**
     * contains the human-readable name for the returned result.
     * For `establishment` results, this is usually the business name.
     */
    description: string;
    /**
     * contains an integer indicating the straight-line distance between the predicted place, and the specified origin point, in meters.
     * This field is only returned when the origin point is specified in the request.
     * This field is not returned in predictions of type route.
     */
    distance_meters?: number;
    /**
     * is a textual identifier that uniquely identifies a place.
     * To retrieve information about the place, pass this identifier in the `placeId` field of a Places API request.
     */
    place_id: string;
    /**
     * contains an array of terms identifying each section of the returned description
     * (a section of the description is generally terminated with a comma).
     */
    terms: PredictionTerm[];
    /**
     * contains an array of types that apply to this place.
     * For example: `[ "political", "locality" ]` or `[ "establishment", "geocode" ]`.
     */
    types: AddressType[];
    /**
     * contains an array with `offset` value and `length`. These describe the location of
     * the entered term in the prediction result text, so that the term can be highlighted if desired.
     */
    matched_substrings: PredictionSubstring[];
    /** contains details on the prediction. */
    structured_formatting: StructuredFormatting;
}
export interface PlaceAutocompleteResponseData extends ResponseData {
    /**
     * contains an array of places, with information about the place.
     * See [Place Autocomplete Results](https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results)
     * for information about these results. The Places API returns up to 5 results.
     */
    predictions: PlaceAutocompleteResult[];
}
export interface PlaceAutocompleteResponse extends AxiosResponse {
    data: PlaceAutocompleteResponseData;
}
export declare const defaultUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
export declare const defaultParamsSerializer: (params: Record<string, any>) => string;
export declare function placeAutocomplete({ params, method, url, paramsSerializer, ...config }: PlaceAutocompleteRequest, axiosInstance?: AxiosInstance): Promise<PlaceAutocompleteResponse>;
