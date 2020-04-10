import { Status } from "../src/common";
import { decodePath } from "../src/util";
import { directions } from "../src/directions";

test("directions should get correct result", async () => {
  const params = {
    origin: "Seattle, WA",
    destination: "San Francisco, CA",
    waypoints: [{ lat: 40, lng: -120 }],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const r = await directions({ params: params });

  expect(r.data.status).toEqual(Status.OK);
  expect(r.data.routes[0].legs[0].distance.value).toBeGreaterThan(0);
  expect(
    decodePath(r.data.routes[0].overview_polyline.points)[0].lat
  ).toBeDefined();
  expect(
    decodePath(r.data.routes[0].legs[0].steps[0].polyline.points)[0].lat
  ).toBeDefined();
});
