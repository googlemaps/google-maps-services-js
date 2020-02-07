import axios from "axios";
import {
  distancematrix,
  defaultParamsSerializer,
  defaultUrl
} from "./distance";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly", () => {
  const params = {
    origins: ["Seattle, WA"],
    destinations: ["San Francisco, CA", "New York, NY"],
    key: "foo"
  };

  distancematrix({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
