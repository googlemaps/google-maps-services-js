import axios from "axios";
import { elevation } from "../src/elevation";
import { Client, defaultHttpsAgent, defaultAxiosInstance } from "../src";

test("client should work with defaults", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const client = new Client();
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("client should work with modified config", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const client = new Client({ config: { timeout: 30000, httpsAgent: defaultHttpsAgent } });
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("client should work with instance", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const client = new Client({ axiosInstance: defaultAxiosInstance });
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});