import { placeDetails } from "../../src/places/details";

test("autocomplete should return correct result", async () => {
  const params = {
    place_id: "ChIJKxDbe_lYwokRVf__s8CPn-o",
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await placeDetails({ params: params });
  expect(r.data.result.place_id).toBeDefined();
});
