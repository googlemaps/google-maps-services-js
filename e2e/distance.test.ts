import { distancematrix } from "../src/distance";

test("elevation should return correct result", async () => {
  const params = {
    origins: ["Seattle, WA"],
    destinations: ["San Francisco, CA", "New York, NY"],
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await distancematrix({ params: params });
  const matrix = r.data.rows;

  expect(matrix.length).toEqual(1);
  expect(matrix[0].elements.length).toEqual(2);
});
