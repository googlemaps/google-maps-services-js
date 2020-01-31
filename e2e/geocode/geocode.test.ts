import { geocode, GeocodeRequest } from "../../src/geocode/geocode";

test("geocode should call axios correctly", async () => {
  const params = {
    address: "Seattle",
    components: { country: "us" },
    bounds: {
      northeast: { lat: 50, lng: -110 },
      southwest: { lat: 35, lng: -130 }
    },
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await geocode({ params: params });
  expect(r.data.results[0].place_id).toBeDefined();
});
