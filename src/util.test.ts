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

import { encodePath, decodePath } from "./util";

describe("polyline encoding and decoding is correct", () => {
  const encoded =
    "gcneIpgxzRcDnBoBlEHzKjBbHlG`@`IkDxIiKhKoMaLwTwHeIqHuAyGXeB~Ew@fFjAtIzExF";
  const decoded = [
    {
      lat: 53.489320000000006,
      lng: -104.16777
    },
    {
      lat: 53.490140000000004,
      lng: -104.16833000000001
    },
    {
      lat: 53.490700000000004,
      lng: -104.16936000000001
    },
    {
      lat: 53.49065,
      lng: -104.17142000000001
    },
    {
      lat: 53.49011,
      lng: -104.17288
    },
    {
      lat: 53.488760000000006,
      lng: -104.17305
    },
    {
      lat: 53.48715000000001,
      lng: -104.17219000000001
    },
    {
      lat: 53.485420000000005,
      lng: -104.17022000000001
    },
    {
      lat: 53.483450000000005,
      lng: -104.1679
    },
    {
      lat: 53.48554000000001,
      lng: -104.16442
    },
    {
      lat: 53.487100000000005,
      lng: -104.16279000000002
    },
    {
      lat: 53.48863000000001,
      lng: -104.16236
    },
    {
      lat: 53.49004000000001,
      lng: -104.16249
    },
    {
      lat: 53.490550000000006,
      lng: -104.16361
    },
    {
      lat: 53.49083,
      lng: -104.16477
    },
    {
      lat: 53.49045,
      lng: -104.16648
    },
    {
      lat: 53.48935,
      lng: -104.16773
    }
  ];

  test("encodePath is correct", () => {
    expect(encodePath(decoded)).toEqual(encoded);
    expect(encodePath([])).toEqual("");
  });

  test("decodePath is correct", () => {
    expect(decodePath(encoded)).toEqual(decoded);
    expect(decodePath("")).toEqual([]);
  });

  test("roundtrip", () => {
    expect(encodePath(decodePath(encoded))).toEqual(encoded);
    expect(decodePath(encodePath(decoded))).toEqual(decoded);
  });
});
