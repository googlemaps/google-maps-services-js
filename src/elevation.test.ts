import axios from "axios";
import { elevation, defaultParamsSerializer, defaultUrl } from "./elevation";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly with location params", () => {
  const params = { locations: ["10,20"], key: "foo" };

  elevation({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});

test("elevation should call axios correctly with path params", () => {
  const params = {
    path: [
      { lat: 35, lng: -110 },
      { lat: 45, lng: -110 }
    ],
    samples: 10,
    key: "foo"
  };

  elevation({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
