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

test("photo should return correct result", async () => {
  const params = {
    photoreference:
      "AZose0kqzNAxzQSLYC-kxAidG_FkCelqG6lXa-05yhbKfwfGd0Agu4YXSjvArtNEYLC8CiCvQb4uxQzfn2fZi2kzxeMBgtOHmbo0c8eqMx_YPVNRCjjPL_kA77NOWF5wOS2ub6ZQlM0G8XibN93burBky0JLCE5sf-C6gLVEG74yiPYoK8id",
    maxwidth: 100,
    maxheight: 100,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  const r = await placePhoto({ params: params, responseType: "arraybuffer" });

  expect(r.status).toEqual(200);
  expect(r.headers["content-type"]).toEqual("image/jpeg");
});
