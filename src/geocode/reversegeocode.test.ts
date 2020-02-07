import axios from "axios";
import {
  reverseGeocode,
  defaultParamsSerializer,
  defaultUrl
} from "./reversegeocode";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("reverseGeocode should call axios correctly", () => {
  const params = {
    latlng: {
      lat: 60.168997,
      lng: 24.9433353
    },
    key: "foo"
  };

  reverseGeocode({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
