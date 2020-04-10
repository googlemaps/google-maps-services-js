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

import { placeQueryAutocomplete } from "../../src/places/queryautocomplete";

test("autocomplete should return correct result", async () => {
  const params = {
    input: "Seattle",
    sessiontoken: "asdf",
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  const r = await placeQueryAutocomplete({ params: params });
  expect(r.data.predictions.length).toBeTruthy();
  expect(r.data.predictions[0].terms.length).toBeTruthy();
});
