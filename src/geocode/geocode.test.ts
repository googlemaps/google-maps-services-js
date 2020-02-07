import axios from "axios";
import { geocode, defaultParamsSerializer, defaultUrl } from "./geocode";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("geocode should call axios correctly", () => {
  const params = { address: "Seattle", key: "foo", components: "country:us" };

  geocode({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
