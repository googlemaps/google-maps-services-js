import { timezone } from "../src/timezone";

test("elevation should get an ok response", async () => {
  const params = {
    location: "30, 50",
    timestamp: new Date(),
    language: "en" as const,
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await timezone({ params: params });

  expect(r.data.status).toEqual("OK");
});
