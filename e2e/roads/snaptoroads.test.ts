import { snapToRoads } from "../../src/roads/snaptoroads";
import { LatLng } from "../../src/common";

test("snapToRoads should have corect result", async () => {
  const params = {
    path: [
      [60.17088, 24.942795] as LatLng,
      [60.170879, 24.942796] as LatLng,
      [60.170877, 24.942796] as LatLng
    ],
    interpolate: false,
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await snapToRoads({ params: params });

  expect(r.data.snappedPoints.length).toEqual(3);
});
