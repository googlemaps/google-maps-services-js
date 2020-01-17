import { Client, userAgent } from "./client";
import { version } from "./index";

test("client can be instantiated", () => {
  const client = new Client({});
  expect(client["axiosInstance"]).toBeDefined();
});

test("client can be instantiated with header options", () => {
  const client = new Client({ headers: { "x-foo": "bar" } });
  expect(client["axiosInstance"]).toBeDefined();
  expect(client["axiosInstance"].defaults.headers["x-foo"]).toEqual("bar");
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
});

test("client can be instantiated without header options", () => {
  const client = new Client({ timeout: 1234 });
  expect(client["axiosInstance"]).toBeDefined();
  expect(client["axiosInstance"].defaults.timeout).toEqual(1234);
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
});

describe("client wraps all functions correctly", () => {
  const client = new Client({});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("client wraps directions correctly", () => {
    const directions = require("./directions");
    const mock = (directions.directions = jest.fn());
    client.directions({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps distancematrix correctly", () => {
    const distance = require("./distance");
    const mock = (distance.distancematrix = jest.fn());
    client.distancematrix({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps elevation correctly", () => {
    const elevation = require("./elevation");
    const mock = (elevation.elevation = jest.fn());
    client.elevation({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps timezone correctly", () => {
    const timezone = require("./timezone");
    const mock = (timezone.timezone = jest.fn());
    client.timezone({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps geolocate correctly", () => {
    const geolocate = require("./geolocate");
    const mock = (geolocate.geolocate = jest.fn());
    client.geolocate({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps geocode correctly", () => {
    const geocode = require("./geocode/geocode");
    const mock = (geocode.geocode = jest.fn());
    client.geocode({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps reverseGeocode correctly", () => {
    const reverseGeocode = require("./geocode/reversegeocode");
    const mock = (reverseGeocode.reverseGeocode = jest.fn());
    client.reverseGeocode({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeAutocomplete correctly", () => {
    const placeAutocomplete = require("./places/autocomplete");
    const mock = (placeAutocomplete.placeAutocomplete = jest.fn());
    client.placeAutocomplete({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeDetails correctly", () => {
    const placeDetails = require("./places/details");
    const mock = (placeDetails.placeDetails = jest.fn());
    client.placeDetails({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps findPlaceFromText correctly", () => {
    const findPlaceFromText = require("./places/findplacefromtext");
    const mock = (findPlaceFromText.findPlaceFromText = jest.fn());
    client.findPlaceFromText({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placePhoto correctly", () => {
    const placePhoto = require("./places/photo");
    const mock = (placePhoto.placePhoto = jest.fn());
    client.placePhoto({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placesNearby correctly", () => {
    const placesNearby = require("./places/placesnearby");
    const mock = (placesNearby.placesNearby = jest.fn());
    client.placesNearby({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeQueryAutocomplete correctly", () => {
    const placeQueryAutocomplete = require("./places/queryautocomplete");
    const mock = (placeQueryAutocomplete.placeQueryAutocomplete = jest.fn());
    client.placeQueryAutocomplete({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps textSearch correctly", () => {
    const textSearch = require("./places/textsearch");
    const mock = (textSearch.textSearch = jest.fn());
    client.textSearch({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps nearestRoads correctly", () => {
    const nearestRoads = require("./roads/nearestroads");
    const mock = (nearestRoads.nearestRoads = jest.fn());
    client.nearestRoads({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps snapToRoads correctly", () => {
    const snapToRoads = require("./roads/snaptoroads");
    const mock = (snapToRoads.snapToRoads = jest.fn());
    client.snapToRoads({});
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });
});
