import axios from "axios";
import {
  findPlaceFromText,
  defaultParamsSerializer,
  defaultUrl
} from "./findplacefromtext";
import { PlaceInputType } from "../common";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("autocomplete should call axios correctly", () => {
  const params = {
    input: "google",
    inputtype: PlaceInputType.textQuery,
    key: "foo",
    fields: ["place_id", "name"]
  };

  findPlaceFromText({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
