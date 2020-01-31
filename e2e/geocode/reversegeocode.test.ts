import { reverseGeocode } from "../../src/geocode/reversegeocode";

test("reverseGeocode should return correct response", async () => {
  const params = {
    latlng: {
      lat: 60.168997,
      lng: 24.9433353
    },
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await reverseGeocode({ params: params });
  expect(r.data.results.length).toBeTruthy();
});
