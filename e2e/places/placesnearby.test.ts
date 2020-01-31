import { placesNearby } from "../../src/places/placesnearby";

test("autocomplete should return correct result", async () => {
  const params = {
    location: { lat: 35, lng: -110 },
    radius: 500000,
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await placesNearby({ params: params });
  expect(r.data.results.length).toBeTruthy();
});
