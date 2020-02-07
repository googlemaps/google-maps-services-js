import axios from "axios";
import { textSearch, defaultParamsSerializer, defaultUrl } from "./textsearch";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("textsearch should call axios correctly", () => {
  const params = { query: "Seattle", key: "foo" };

  textSearch({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});
