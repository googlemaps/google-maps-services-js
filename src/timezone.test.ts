import { defaultParamsSerializer, defaultUrl, timezone } from "./timezone";

import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly", () => {
  const params = {
    location: { lat: 35, lng: -110 },
    timestamp: 999999999,
    key: "foo"
  };
  timezone({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});

test("serializer should handle date object", () => {
  const dt = new Date();
  expect(defaultParamsSerializer({timestamp: dt})).toEqual(`timestamp=${Number(dt)/1000}`)
});
