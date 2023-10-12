/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Client,
  userAgent,
  acceptEncoding,
  DirectionsRequest,
  DistanceMatrixRequest,
  ElevationRequest,
  TimeZoneRequest,
  GeolocateRequest,
  GeocodeRequest,
  ReverseGeocodeRequest,
  PlaceAutocompleteRequest,
  PlaceDetailsRequest,
  FindPlaceFromTextRequest,
  PlacePhotoRequest,
  PlacesNearbyRequest,
  PlaceQueryAutocompleteRequest,
  TextSearchRequest,
  NearestRoadsRequest,
  SnapToRoadsRequest,
  X_GOOG_MAPS_EXPERIENCE_ID,
  defaultAxiosInstance,
} from "./client";

import axios from "axios";

test("client can be instantiated", () => {
  const client = new Client({});
  expect(client["axiosInstance"]).toBeDefined();
});

test("client can be instantiated with axiosInstance", () => {
  const client = new Client({ axiosInstance: axios.create({}) });
  expect(client["axiosInstance"]).toBeDefined();
});

test("client can be instantiated with axiosInstance has correct defaults", () => {
  const client = new Client({ axiosInstance: axios.create({}) });
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
  expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(
    acceptEncoding
  );
  expect(client["axiosInstance"].defaults.timeout).toEqual(
    axios.defaults.timeout
  );
});

test("client instantiated with custom instance and config throws error", () => {
  expect(() => {
    new Client({
      axiosInstance: defaultAxiosInstance,
      config: { timeout: 10000 },
    });
  }).toThrowError();
});

test("client can be instantiated with header options", () => {
  const client = new Client({ config: { headers: { "x-foo": "bar" } } });
  expect(client["axiosInstance"]).toBeDefined();
  expect(client["axiosInstance"].defaults.headers["x-foo"]).toEqual("bar");
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
  expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(
    acceptEncoding
  );
});

test("client can be override Accept-Encoding with header options", () => {
  const client = new Client({
    config: { headers: { "x-foo": "bar", "Accept-Encoding": "identity" } },
  });
  expect(client["axiosInstance"]).toBeDefined();
  expect(client["axiosInstance"].defaults.headers["x-foo"]).toEqual("bar");
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
  expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(
    "identity"
  );
});

test("client can be instantiated without header options", () => {
  const client = new Client({ config: { timeout: 1234 } });
  expect(client["axiosInstance"]).toBeDefined();
  expect(client["axiosInstance"].defaults.timeout).toEqual(1234);
  expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(
    userAgent
  );
  expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(
    acceptEncoding
  );
});

test("client can be instantiated with experienceId", () => {
  const client = new Client({ experienceId: ["foo", "bar"] });
  expect(
    client["axiosInstance"].defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID]
  ).toEqual("foo,bar");
});

test("getExperienceId returns correct value", () => {
  const ids = ["foo", "bar"];
  const client = new Client({ experienceId: ids });
  expect(client.getExperienceId()).toEqual(ids);
});

test("clearExperienceIdHeader removes value and header from defaults", () => {
  const client = new Client({});
  client["axiosInstance"].defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID] = "foo";
  client.clearExperienceId();
  expect(
    client["axiosInstance"].defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID]
  ).toBeUndefined();
  expect(client["experienceId"]).toBeNull();
});

test("setExperienceId sets value and header", () => {
  const client = new Client({});
  const ids = ["foo", "bar"];
  client.setExperienceId(...ids);
  expect(
    client["axiosInstance"].defaults.headers[X_GOOG_MAPS_EXPERIENCE_ID]
  ).toEqual("foo,bar");
  expect(client["experienceId"]).toEqual(ids);
});

describe("client wraps all functions correctly", () => {
  const client = new Client({});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("client wraps directions correctly", () => {
    const directions = require("./directions");
    const mock = (directions.directions = jest.fn());
    client.directions({} as DirectionsRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps distancematrix correctly", () => {
    const distance = require("./distance");
    const mock = (distance.distancematrix = jest.fn());
    client.distancematrix({} as DistanceMatrixRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps elevation correctly", () => {
    const elevation = require("./elevation");
    const mock = (elevation.elevation = jest.fn());
    client.elevation({} as ElevationRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps timezone correctly", () => {
    const timezone = require("./timezone");
    const mock = (timezone.timezone = jest.fn());
    client.timezone({} as TimeZoneRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps geolocate correctly", () => {
    const geolocate = require("./geolocate");
    const mock = (geolocate.geolocate = jest.fn());
    client.geolocate({} as GeolocateRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps geocode correctly", () => {
    const geocode = require("./geocode/geocode");
    const mock = (geocode.geocode = jest.fn());
    client.geocode({} as GeocodeRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps reverseGeocode correctly", () => {
    const reverseGeocode = require("./geocode/reversegeocode");
    const mock = (reverseGeocode.reverseGeocode = jest.fn());
    client.reverseGeocode({} as ReverseGeocodeRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeAutocomplete correctly", () => {
    const placeAutocomplete = require("./places/autocomplete");
    const mock = (placeAutocomplete.placeAutocomplete = jest.fn());
    client.placeAutocomplete({} as PlaceAutocompleteRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeDetails correctly", () => {
    const placeDetails = require("./places/details");
    const mock = (placeDetails.placeDetails = jest.fn());
    client.placeDetails({} as PlaceDetailsRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps findPlaceFromText correctly", () => {
    const findPlaceFromText = require("./places/findplacefromtext");
    const mock = (findPlaceFromText.findPlaceFromText = jest.fn());
    client.findPlaceFromText({} as FindPlaceFromTextRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placePhoto correctly", () => {
    const placePhoto = require("./places/photo");
    const mock = (placePhoto.placePhoto = jest.fn());
    client.placePhoto({} as PlacePhotoRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placesNearby correctly", () => {
    const placesNearby = require("./places/placesnearby");
    const mock = (placesNearby.placesNearby = jest.fn());
    client.placesNearby({} as PlacesNearbyRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps placeQueryAutocomplete correctly", () => {
    const placeQueryAutocomplete = require("./places/queryautocomplete");
    const mock = (placeQueryAutocomplete.placeQueryAutocomplete = jest.fn());
    client.placeQueryAutocomplete({} as PlaceQueryAutocompleteRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps textSearch correctly", () => {
    const textSearch = require("./places/textsearch");
    const mock = (textSearch.textSearch = jest.fn());
    client.textSearch({} as TextSearchRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps nearestRoads correctly", () => {
    const nearestRoads = require("./roads/nearestroads");
    const mock = (nearestRoads.nearestRoads = jest.fn());
    client.nearestRoads({} as NearestRoadsRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });

  test("client wraps snapToRoads correctly", () => {
    const snapToRoads = require("./roads/snaptoroads");
    const mock = (snapToRoads.snapToRoads = jest.fn());
    client.snapToRoads({} as SnapToRoadsRequest);
    expect(mock).toBeCalledWith({}, client["axiosInstance"]);
  });
});
