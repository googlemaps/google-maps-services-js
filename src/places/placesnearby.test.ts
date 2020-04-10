import {
  PlacesNearbyRanking,
  defaultParamsSerializer,
  defaultUrl,
  placesNearby
} from "./placesnearby";

import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("autocomplete should call axios correctly", () => {
  const params = {
    location: { lat: 35, lng: -110 },
    key: "foo",
    ranking: PlacesNearbyRanking.distance
  };

  placesNearby({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    url: defaultUrl,
    paramsSerializer: defaultParamsSerializer
  });
});
