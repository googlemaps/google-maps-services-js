import axios from "axios";
import {
  snapToRoads,
  defaultParamsSerializer,
  defaultUrl
} from "./snaptoroads";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("snapToRoads should call axios correctly", () => {
  const params = { path: ["0,0"], key: "foo" };

  snapToRoads({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
