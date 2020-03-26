import { LatLng, LatLngLiteral } from "./common";
import {
  latLngArrayToStringMaybeEncoded,
  latLngBoundsToString,
  latLngToString,
  objectToString,
  serializer,
  toLatLngLiteral,
  toTimestamp
} from "./serialize";

test("latLngToString is correct", () => {
  expect(latLngToString("")).toBe("");
  expect(latLngToString("10,20")).toBe("10,20");
  expect(latLngToString([10, 20])).toBe("10,20");
  expect(latLngToString({ lat: 10, lng: 20 })).toBe("10,20");
  expect(latLngToString({ latitude: 10, longitude: 20 })).toBe("10,20");
  expect(() => {
    latLngToString({} as LatLngLiteral);
  }).toThrow(TypeError);
});

test("latLngBoundsToString is correct", () => {
  expect(latLngBoundsToString("")).toBe("");
  expect(
    latLngBoundsToString({
      southwest: { lat: 1, lng: 2 },
      northeast: { lat: 3, lng: 4 }
    })
  ).toBe("1,2|3,4");
});

test("serializer", () => {
  expect(serializer({ quz: o => o })({ foo: ["bar"] })).toBe("foo=bar");
  expect(
    serializer({ foo: o => o.map((latLng: LatLng) => latLngToString(latLng)) })(
      {
        foo: [
          [0, 1],
          [2, 3]
        ]
      }
    )
  ).toBe("foo=0%2C1|2%2C3");
});

test("serializer should return pipe joined arrays by default", () => {
  expect(serializer({})({ foo: ["b", "a", "r"] })).toBe("foo=b|a|r");
});

test("objectToString", () => {
  expect(objectToString("foo")).toBe("foo");
  expect(objectToString({ c: "c", a: "a", b: "b" })).toBe("a:a|b:b|c:c");
});

test("latLngArrayToStringMaybeEncoded", () => {
  expect(latLngArrayToStringMaybeEncoded("0,0")).toEqual("0,0");
  expect(latLngArrayToStringMaybeEncoded([[0, 0]])).toEqual("0,0");
  expect(
    latLngArrayToStringMaybeEncoded([
      [40.714728, -73.998672],
      [-34.397, 150.644]
    ])
  ).toEqual("enc:abowFtzsbMhgmiMuobzi@");
});

test("toLatLngLiteral", () => {
  expect(toLatLngLiteral("0,1")).toEqual({ lat: 0, lng: 1 });
  expect(toLatLngLiteral([0, 1])).toEqual({ lat: 0, lng: 1 });
  expect(toLatLngLiteral({ lat: 0, lng: 1 })).toEqual({
    lat: 0,
    lng: 1
  });
  expect(toLatLngLiteral({ latitude: 0, longitude: 1 })).toEqual({
    lat: 0,
    lng: 1
  });
  expect(() => {
    toLatLngLiteral({} as LatLngLiteral);
  }).toThrow(TypeError);
});

test("toTimestamp", () => {
  expect(toTimestamp(100)).toEqual(100);
  
  const dt = new Date();
  const seconds = Number(dt) / 1000
  expect(toTimestamp(dt)).toEqual(seconds);

});

