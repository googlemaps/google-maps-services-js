import axios from "axios";
import { elevation } from "../src/elevation";

test("elevation should return correct result", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("elevation should return correct result with path params", async () => {
  const path = [
    { lat: 35, lng: -110 },
    { lat: 45, lng: -110 }
  ];

  const params = {
    path: path,
    samples: 10,
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await elevation({ params: params });

  expect(r.data.results.length).toEqual(10);
});
