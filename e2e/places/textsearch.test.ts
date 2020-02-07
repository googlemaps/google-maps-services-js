import { textSearch } from "../../src/places/textsearch";

test("textsearch should return correct result", async () => {
  const params = { query: "Seattle", key: process.env.GOOGLE_MAPS_API_KEY };

  const r = await textSearch({ params: params });

  expect(r.data.results.length).toBeTruthy();
});
