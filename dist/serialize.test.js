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
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_1 = require("./serialize");
test("latLngToString is correct", () => {
    expect((0, serialize_1.latLngToString)("")).toBe("");
    expect((0, serialize_1.latLngToString)("10,20")).toBe("10,20");
    expect((0, serialize_1.latLngToString)([10, 20])).toBe("10,20");
    expect((0, serialize_1.latLngToString)({ lat: 10, lng: 20 })).toBe("10,20");
    expect((0, serialize_1.latLngToString)({ latitude: 10, longitude: 20 })).toBe("10,20");
    expect(() => {
        (0, serialize_1.latLngToString)({});
    }).toThrow(TypeError);
});
test("latLngBoundsToString is correct", () => {
    expect((0, serialize_1.latLngBoundsToString)("")).toBe("");
    expect((0, serialize_1.latLngBoundsToString)({
        southwest: { lat: 1, lng: 2 },
        northeast: { lat: 3, lng: 4 },
    })).toBe("1,2|3,4");
});
test("serializer", () => {
    expect((0, serialize_1.serializer)({ quz: (o) => o }, "http://mock.url")({ foo: ["bar"] })).toBe("foo=bar");
    expect((0, serialize_1.serializer)({
        foo: (o) => o.map((latLng) => (0, serialize_1.latLngToString)(latLng)),
    }, "http://mock.url")({
        foo: [
            [0, 1],
            [2, 3],
        ],
    })).toBe("foo=0%2C1|2%2C3");
});
test("serializer should not mutate params", () => {
    const location = { lat: 0, lng: 1 };
    const params = {
        location,
    };
    (0, serialize_1.serializer)({ location: serialize_1.latLngToString }, "http://mock.url")(params);
    expect(params.location).toBe(location);
});
test("serializer should return pipe joined arrays by default", () => {
    expect((0, serialize_1.serializer)({}, "http://mock.url")({ foo: ["b", "a", "r"] })).toBe("foo=b|a|r");
});
test("serializer creates premium plan query string if premium plan params are included", () => {
    const params = {
        avoid: "ferries",
        destination: {
            lat: "38.8977",
            lng: "-77.0365",
        },
        mode: "driving",
        origin: {
            lat: "33.8121",
            lng: "-117.9190",
        },
        units: "imperial",
        client_id: "testClient",
        client_secret: "testClientSecret",
    };
    expect((0, serialize_1.serializer)({
        origin: serialize_1.latLngToString,
        destination: serialize_1.latLngToString,
    }, "https://test.url/maps/api/directions/json")(params)).toEqual("avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial&signature=YRJoTd6ohbpsR14WkWv3S7H6MqU=");
});
test("objectToString", () => {
    expect((0, serialize_1.objectToString)("foo")).toBe("foo");
    expect((0, serialize_1.objectToString)({ c: "c", a: "a", b: "b" })).toBe("a:a|b:b|c:c");
});
test("latLngArrayToStringMaybeEncoded", () => {
    expect((0, serialize_1.latLngArrayToStringMaybeEncoded)("0,0")).toEqual("0,0");
    expect((0, serialize_1.latLngArrayToStringMaybeEncoded)([[0, 0]])).toEqual("0,0");
    expect((0, serialize_1.latLngArrayToStringMaybeEncoded)([
        [40.714728, -73.998672],
        [-34.397, 150.644],
    ])).toEqual("enc:abowFtzsbMhgmiMuobzi@");
});
test("toLatLngLiteral", () => {
    expect((0, serialize_1.toLatLngLiteral)("0,1")).toEqual({ lat: 0, lng: 1 });
    expect((0, serialize_1.toLatLngLiteral)([0, 1])).toEqual({ lat: 0, lng: 1 });
    expect((0, serialize_1.toLatLngLiteral)({ lat: 0, lng: 1 })).toEqual({
        lat: 0,
        lng: 1,
    });
    expect((0, serialize_1.toLatLngLiteral)({ latitude: 0, longitude: 1 })).toEqual({
        lat: 0,
        lng: 1,
    });
    expect(() => {
        (0, serialize_1.toLatLngLiteral)({});
    }).toThrow(TypeError);
});
test("toTimestamp", () => {
    expect((0, serialize_1.toTimestamp)(100)).toEqual(100);
    const dt = new Date();
    const seconds = Math.round(Number(dt) / 1000);
    expect((0, serialize_1.toTimestamp)(dt)).toEqual(seconds);
    expect((0, serialize_1.toTimestamp)("now")).toEqual("now");
    expect((0, serialize_1.toTimestamp)(new Date("2022-06-22T09:03:33.430Z"))).toEqual(1655888613);
});
test("createPremiumPlanQueryString", () => {
    const serializedParams = {
        avoid: "ferries",
        destination: "38.8977,-77.0365",
        mode: "driving",
        origin: "33.8121,-117.9190",
        units: "imperial",
        client_id: "testClient",
        client_secret: "testClientSecret",
    };
    const queryStringOptions = {
        arrayFormat: "separator",
        arrayFormatSeparator: "|",
    };
    const baseUrl = "https://test.url/maps/api/directions/json";
    expect((0, serialize_1.createPremiumPlanQueryString)(serializedParams, queryStringOptions, baseUrl)).toEqual("avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial&signature=YRJoTd6ohbpsR14WkWv3S7H6MqU=");
});
//# sourceMappingURL=serialize.test.js.map