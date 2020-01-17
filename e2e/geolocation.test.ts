import { geolocate, GeolocateResponseData } from "../src/geolocate";

test("elevation should call axios correctly", async () => {
  const params = { key: process.env.GOOGLE_MAPS_API_KEY };
  const r = await geolocate({ params: params });
  expect(r.data).toHaveProperty("location");
});
