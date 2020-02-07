import axios from "axios";
import {
  placeQueryAutocomplete,
  defaultParamsSerializer,
  defaultUrl
} from "./queryautocomplete";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("autocomplete should call axios correctly", () => {
  const params = { input: "Seattle", sessiontoken: "asdf", key: "foo" };

  placeQueryAutocomplete({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
