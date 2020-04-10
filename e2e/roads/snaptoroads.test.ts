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

import { snapToRoads } from "../../src/roads/snaptoroads";
import { LatLng } from "../../src/common";

test("snapToRoads should have corect result", async () => {
  const params = {
    path: [
      [60.17088, 24.942795] as LatLng,
      [60.170879, 24.942796] as LatLng,
      [60.170877, 24.942796] as LatLng
    ],
    interpolate: false,
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await snapToRoads({ params: params });

  expect(r.data.snappedPoints.length).toEqual(3);
});
