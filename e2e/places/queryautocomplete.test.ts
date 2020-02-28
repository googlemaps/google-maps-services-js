import { placeQueryAutocomplete } from "../../src/places/queryautocomplete";

test("autocomplete should return correct result", async () => {
  const params = {
    input: "Seattle",
    sessiontoken: "asdf",
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await placeQueryAutocomplete({ params: params });
  expect(r.data.predictions.length).toBeTruthy();
  expect(r.data.predictions[0].terms.length).toBeTruthy();
});
