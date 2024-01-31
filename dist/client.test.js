"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const axios_1 = __importDefault(require("axios"));
test("client can be instantiated", () => {
    const client = new client_1.Client({});
    expect(client["axiosInstance"]).toBeDefined();
});
test("client can be instantiated with axiosInstance", () => {
    const client = new client_1.Client({ axiosInstance: axios_1.default.create({}) });
    expect(client["axiosInstance"]).toBeDefined();
});
test("client can be instantiated with axiosInstance has correct defaults", () => {
    const client = new client_1.Client({ axiosInstance: axios_1.default.create({}) });
    expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(client_1.userAgent);
    expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(client_1.acceptEncoding);
    expect(client["axiosInstance"].defaults.timeout).toEqual(axios_1.default.defaults.timeout);
});
test("client instantiated with custom instance and config throws error", () => {
    expect(() => {
        new client_1.Client({
            axiosInstance: client_1.defaultAxiosInstance,
            config: { timeout: 10000 },
        });
    }).toThrowError();
});
test("client can be instantiated with header options", () => {
    const client = new client_1.Client({ config: { headers: { "x-foo": "bar" } } });
    expect(client["axiosInstance"]).toBeDefined();
    expect(client["axiosInstance"].defaults.headers["x-foo"]).toEqual("bar");
    expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(client_1.userAgent);
    expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(client_1.acceptEncoding);
});
test("client can be override Accept-Encoding with header options", () => {
    const client = new client_1.Client({
        config: { headers: { "x-foo": "bar", "Accept-Encoding": "identity" } },
    });
    expect(client["axiosInstance"]).toBeDefined();
    expect(client["axiosInstance"].defaults.headers["x-foo"]).toEqual("bar");
    expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(client_1.userAgent);
    expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe("identity");
});
test("client can be instantiated without header options", () => {
    const client = new client_1.Client({ config: { timeout: 1234 } });
    expect(client["axiosInstance"]).toBeDefined();
    expect(client["axiosInstance"].defaults.timeout).toEqual(1234);
    expect(client["axiosInstance"].defaults.headers["User-Agent"]).toEqual(client_1.userAgent);
    expect(client["axiosInstance"].defaults.headers["Accept-Encoding"]).toBe(client_1.acceptEncoding);
});
test("client can be instantiated with experienceId", () => {
    const client = new client_1.Client({ experienceId: ["foo", "bar"] });
    expect(client["axiosInstance"].defaults.headers[client_1.X_GOOG_MAPS_EXPERIENCE_ID]).toEqual("foo,bar");
});
test("getExperienceId returns correct value", () => {
    const ids = ["foo", "bar"];
    const client = new client_1.Client({ experienceId: ids });
    expect(client.getExperienceId()).toEqual(ids);
});
test("clearExperienceIdHeader removes value and header from defaults", () => {
    const client = new client_1.Client({});
    client["axiosInstance"].defaults.headers[client_1.X_GOOG_MAPS_EXPERIENCE_ID] = "foo";
    client.clearExperienceId();
    expect(client["axiosInstance"].defaults.headers[client_1.X_GOOG_MAPS_EXPERIENCE_ID]).toBeUndefined();
    expect(client["experienceId"]).toBeNull();
});
test("setExperienceId sets value and header", () => {
    const client = new client_1.Client({});
    const ids = ["foo", "bar"];
    client.setExperienceId(...ids);
    expect(client["axiosInstance"].defaults.headers[client_1.X_GOOG_MAPS_EXPERIENCE_ID]).toEqual("foo,bar");
    expect(client["experienceId"]).toEqual(ids);
});
describe("client wraps all functions correctly", () => {
    const client = new client_1.Client({});
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
//# sourceMappingURL=client.test.js.map