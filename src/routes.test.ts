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

import axios from "axios";
import { routes, defaultUrl, RoutesRequest } from "./routes";
import { LatLng } from "./common";
import { RouteTravelMode } from "./interfaces/routes";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("routes should call axios correctly", () => {
  const routesRequest = {
    params: {
      origin: { lat: 47.6062, lng: -122.3321 } as LatLng,
      destination: { lat: 37.7749, lng: -122.4194 } as LatLng,
      travelMode: RouteTravelMode.DRIVE,
    },
    apiKey: { key: "foo" },
  } as RoutesRequest;

  const expectedAxiosInstanceParams = {
    params: { ...routesRequest.apiKey },
    method: "post",
    data: { ...routesRequest.params },
    url: defaultUrl,
    headers: {
      "X-Goog-FieldMask": "*",
    },
  };

  routes(routesRequest, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith(expectedAxiosInstanceParams);
});
