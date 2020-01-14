import axios from "axios";
import { placePhoto, defaultUrl } from "./photo";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("photo should call axios correctly", () => {
  const params = { photoreference: "notaphotoreference", key: "foo" };

  placePhoto({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    url: defaultUrl
  });
});
