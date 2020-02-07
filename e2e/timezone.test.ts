import { timezone } from "../src/timezone";

test("elevation should call axios correctly", async () => {
  const params = {
    location: { lat: 35, lng: -110 },
    timestamp: 0,
    language: "en" as const,
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await timezone({ params: params });

  expect(r.data.status).toEqual("OK");
});
