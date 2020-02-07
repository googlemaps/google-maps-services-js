import { Language, ResponseData, Place, PlaceInputType, RequestParams } from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer } from "../serialize";

export interface FindPlaceFromTextRequest extends Partial<AxiosRequestConfig> {
  params: {
    /** The text input specifying which place to search for (for example, a name, address, or phone number). */
    input: string;
    /** The type of input. This can be one of either `textQuery` or `phoneNumber`. */
    inputtype: PlaceInputType;
    /**
     * The language code, indicating in which language the results should be returned, if possible.
     * Searches are also biased to the selected language; results in the selected language may be given a higher ranking
     */
    language?: Language;
    /**
     * The fields specifying the types of place data to return.
     *
     * **Note:** If you omit the fields parameter from a Find Place request, only the place_id for the result will be returned.
     */
    fields?: string[];
    /**
     * Prefer results in a specified area, by specifying either a radius plus lat/lng, or two lat/lng pairs representing
     * the points of a rectangle. If this parameter is not specified, the API uses IP address biasing by default.
     */
    locationbias?: string;
    } & RequestParams;
}

export interface FindPlaceFromTextResponseData extends ResponseData {
  candidates: Place[];
}

export interface FindPlaceFromTextResponse extends AxiosResponse {
  data: FindPlaceFromTextResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";

export const defaultParamsSerializer = serializer({});

export function findPlaceFromText(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: FindPlaceFromTextRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<FindPlaceFromTextResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<FindPlaceFromTextResponse>;
}
