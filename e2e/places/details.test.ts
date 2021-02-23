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

import { placeDetails } from "../../src/places/details";

test("details should return correct result", async () => {
  const params = {
    place_id: "ChIJKxDbe_lYwokRVf__s8CPn-o",
    key: process.env.GOOGLE_MAPS_API_KEY,
    fields: ["place_id", "name", "formatted_address"],
  };

  const r = await placeDetails({ params: params });
  expect(r.data.result.place_id).toBeDefined();
  expect(Object.keys(r.data.result).sort()).toEqual(params.fields.sort());
});

test("details should return all fields", async () => {
  const params = {
    place_id: "ChIJKxDbe_lYwokRVf__s8CPn-o",
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  const r = await placeDetails({ params: params });

  expect(r.data.result.address_components).toBeDefined();
  expect(r.data.result.adr_address).toBeDefined();
  expect(r.data.result.business_status).toBeDefined();
  expect(r.data.result.formatted_address).toBeDefined();
  expect(r.data.result.formatted_phone_number).toBeDefined();
  expect(r.data.result.geometry).toBeDefined();
  expect(r.data.result.icon).toBeDefined();
  expect(r.data.result.international_phone_number).toBeDefined();
  expect(r.data.result.name).toBeDefined();
  expect(r.data.result.photos).toBeDefined();
  expect(r.data.result.place_id).toBeDefined();
  expect(r.data.result.plus_code).toBeDefined();
  expect(r.data.result.rating).toBeDefined();
  expect(r.data.result.reviews).toBeDefined();
  expect(r.data.result.types).toBeDefined();
  expect(r.data.result.url).toBeDefined();
  expect(r.data.result.user_ratings_total).toBeDefined();
  expect(r.data.result.utc_offset).toBeDefined();
  expect(r.data.result.vicinity).toBeDefined();
  expect(r.data.result.website).toBeDefined();

  expect(r.data.result.reviews[0].author_name).toBeDefined();
  expect(r.data.result.reviews[0].author_url).toBeDefined();
  expect(r.data.result.reviews[0].language).toBeDefined();
  expect(r.data.result.reviews[0].profile_photo_url).toBeDefined();
  expect(r.data.result.reviews[0].rating).toBeDefined();
  expect(r.data.result.reviews[0].relative_time_description).toBeDefined();
  expect(r.data.result.reviews[0].text).toBeDefined();
  expect(r.data.result.reviews[0].time).toBeDefined();

  expect(r.data.result.photos[0].height).toBeDefined();
  expect(r.data.result.photos[0].html_attributions).toBeDefined();
  expect(r.data.result.photos[0].photo_reference).toBeDefined();
  expect(r.data.result.photos[0].width).toBeDefined();

  expect(Object.keys(r.data.result).sort()).toMatchInlineSnapshot(`
    Array [
      "address_components",
      "adr_address",
      "business_status",
      "formatted_address",
      "formatted_phone_number",
      "geometry",
      "icon",
      "international_phone_number",
      "name",
      "opening_hours",
      "photos",
      "place_id",
      "plus_code",
      "rating",
      "reference",
      "reviews",
      "types",
      "url",
      "user_ratings_total",
      "utc_offset",
      "vicinity",
      "website",
    ]
  `);
});
