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
import { elevation, defaultParamsSerializer, defaultUrl } from "./elevation";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly with location params", () => {
  const params = { locations: ["10,20"], key: "foo" };

  elevation({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});

test("elevation should call axios correctly with path params", () => {
  const params = {
    path: [
      { lat: 35, lng: -110 },
      { lat: 45, lng: -110 }
    ],
    samples: 10,
    key: "foo"
  };

  elevation({ params: params }, mockedAxios);

  expect(mockedAxios).toHaveBeenCalledTimes(1);
  expect(mockedAxios).toHaveBeenCalledWith({
    method: "get",
    params: params,
    paramsSerializer: defaultParamsSerializer,
    url: defaultUrl
  });
});

test("serializer should transform correctly", () => {
  const params = {
    path: [
      { lat: 35, lng: -110 },
      { lat: 45, lng: -110 }
    ],
    samples: 10,
    key: "foo"
  };

  expect(defaultParamsSerializer(params))
    .toEqual("key=foo&path=35%2C-110|45%2C-110&samples=10");
});
