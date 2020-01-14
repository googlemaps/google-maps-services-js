import axios from "axios";
import {
  placeAutocomplete,
  defaultParamsSerializer,
  defaultUrl
} from "./autocomplete";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("autocomplete should call axios correctly", () => {
  const params = { input: "Seattle", sessiontoken: "asdf", key: "foo" };

  placeAutocomplete({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
