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
