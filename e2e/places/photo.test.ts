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

import { placePhoto } from "../../src/places/photo";
import { placeDetails } from "../../src/places/details";

test("photo should return correct result", async () => {
  const placeDetailsResponse = await placeDetails({
    params: {
      // The Museum of Modern Art, 11 W 53rd St, New York
      place_id: "ChIJKxDbe_lYwokRVf__s8CPn-o",
      key: process.env.GOOGLE_MAPS_API_KEY,
      fields: ["place_id", "photo"],
    },
  });

  const [photo] = placeDetailsResponse.data.result.photos;
  const { photo_reference: photoreference } = photo;

  const params = {
    photoreference,
    maxwidth: 1000,
    maxheight: 1000,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const r = await placePhoto({ params: params, responseType: "arraybuffer" });

  expect(r.status).toEqual(200);
  expect(r.headers["content-type"]).toEqual("image/jpeg");
});
