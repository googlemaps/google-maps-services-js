import { placeAutocomplete } from "../../src/places/autocomplete";

test("autocomplete should return correct result", async () => {
  const params = {
    input: "Seattle, WA",
    sessiontoken: "123",
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const r = await placeAutocomplete({ params: params });
  expect(r.data.predictions.length).toBeTruthy();
});
