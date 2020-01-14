import axios from "axios";
import {
  nearestRoads,
  defaultParamsSerializer,
  defaultUrl
} from "./nearestroads";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("nearestRoads should call axios correctly", () => {
  const params = { points: ["0,0"], key: "foo" };

  nearestRoads({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
