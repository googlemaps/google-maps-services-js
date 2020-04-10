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
import { directions } from "../src/directions";

test("server responds with compressed content", async () => {
  const params = {
    origin: "Seattle, WA",
    destination: "San Francisco, CA",
    waypoints: [{ lat: 40, lng: -120 }],
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  // Use of directions here is entirely arbitrary and any API that supports
  // result compression could be substituted.

  const r = await directions({ params: params });
  expect(r.data.status).toEqual(Status.OK);

  // Axios removes conent-encoding from the response header set once it takes
  // care of piping the stream through a zlib unzip instance.  So verifying
  // that the server responds with a compressed response must be done via the
  // raw headers.

  const {rawHeaders} = r.request.res;
  const contentEncodingIndex = rawHeaders
      .findIndex(i => i.toLowerCase() === "content-encoding");

  expect(contentEncodingIndex).not.toBe(-1);
  expect(rawHeaders[contentEncodingIndex + 1]).toBe("gzip");
  expect(r.headers["Content-Encoding"]).toBeUndefined();
});
