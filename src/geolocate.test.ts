import axios from "axios";
import { geolocate, defaultUrl } from "./geolocate";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly", () => {
  const params = { key: "foo" };
  const data = { considerIp: false };
  geolocate({ params: params, data: data }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "post",
    params: params,
    data: data,
    url: defaultUrl
  });
});
