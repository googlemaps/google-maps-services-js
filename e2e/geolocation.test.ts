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

import { geolocate } from "../src/geolocate";

test.skip("geolocate should call axios correctly", async () => {
  const params = { key: process.env.GOOGLE_MAPS_API_KEY };
  const data = { considerIp: false };

  // geolocation depends upon the ip address of the client.
  // it is not deterministic and will return 404 for some IPs.
  try {
    const r = await geolocate({ params, data });
    expect(r.data).toHaveProperty("location");
  } catch (e) {
    expect(e.response.status).toEqual(404);
  }
});
