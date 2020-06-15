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

import { Status } from "../src/common";
import { decodePath } from "../src/util";
import { directions } from "../src/directions";

test("directions should get correct result", async () => {
  const params = {
    origin: "Adelaide,SA",
    destination: "Adelaide,SA",
    waypoints: [
      "Barossa+Valley,SA",
      "Clare,SA",
      "Connawarra,SA",
      "McLaren+Vale,SA",
    ],
    optimize: true,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const r = await directions({ params: params });
  expect(r.request.path).toMatch(
    "waypoints=optimize%3Atrue|Barossa"
  );
  expect(r.data.status).toEqual(Status.OK);
  expect(r.data.routes[0].legs[0].distance.value).toBeGreaterThan(0);
  expect(
    decodePath(r.data.routes[0].overview_polyline.points)[0].lat
  ).toBeDefined();
  expect(
    decodePath(r.data.routes[0].legs[0].steps[0].polyline.points)[0].lat
  ).toBeDefined();
});
