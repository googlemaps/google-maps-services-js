import { nearestRoads } from "../../src/roads/nearestroads";
import { LatLng } from "../../src/common";

test("nearestRoads should return correct response", async () => {
  const params = {
    points: [[60.17088, 24.942795] as LatLng],
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await nearestRoads({ params: params });
  expect(r.data.snappedPoints.length).toEqual(1);
});
