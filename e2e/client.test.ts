/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Client, defaultAxiosInstance, defaultHttpsAgent } from "../src";
import { AxiosError } from "axios";

test("client should work with defaults", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const client = new Client();
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("client should work with modified config", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const client = new Client({
    config: { timeout: 30000, httpsAgent: defaultHttpsAgent },
  });
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("client should work with instance", async () => {
  const location = { lat: 10, lng: 20 };

  const params = {
    locations: [location, location],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const client = new Client({ axiosInstance: defaultAxiosInstance });
  const r = await client.elevation({ params: params });

  expect(r.data.results.length).toEqual(2);
});

test("readme example using client", async () => {
  const { Client, Status } = require("../src");
  const client = new Client({});

  await client
    .elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      expect(r.data.status).toEqual(Status.OK);
      expect(r.data.results[0].elevation).toBeGreaterThan(2000);
      expect(r.data.results[0].elevation).toBeLessThan(3000);
    })
    .catch((e) => {
      console.log(e);
      throw "Should not error";
    });
});

test("readme example using client fails correctly", async () => {
  const { Client, Status } = require("../src");
  const client = new Client({});

  await client
    .elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key: "invalid key",
      },
      timeout: 1000, // milliseconds
    })
    .catch((e: AxiosError) => {
      expect(e.response.status).toEqual(403);
      expect(e.response.data.status).toEqual(Status.REQUEST_DENIED);
    });
});
