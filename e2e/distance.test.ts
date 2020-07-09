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

import { distancematrix } from "../src/distance";

test("distance should return correct result", async () => {
  const params = {
    origins: ["Seattle, WA"],
    destinations: ["San Francisco, CA", "New York, NY"],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  const r = await distancematrix({ params: params });
  const matrix = r.data.rows;

  expect(matrix.length).toEqual(1);
  expect(matrix[0].elements.length).toEqual(2);
});

test("distance between two latlngs", async () => {
  const params = {
    origins: [{ lat: 22.2805459, lng: 70.8011263 }],
    destinations: [{ lat: 22.2970336, lng: 70.8148468 }],
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  const r = await distancematrix({ params: params });

  const matrix = r.data.rows;

  expect(matrix[0].elements[0].distance.value).toBeGreaterThan(0);
  expect(matrix[0].elements[0].duration.value).toBeGreaterThan(0);
});
