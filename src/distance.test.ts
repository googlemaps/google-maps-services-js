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
import {
  distancematrix,
  defaultParamsSerializer,
  defaultUrl
} from "./distance";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});

test("elevation should call axios correctly", () => {
  const params = {
    origins: ["Seattle, WA"],
    destinations: ["San Francisco, CA", "New York, NY"],
    key: "foo"
  };

  distancematrix({ params: params }, mockedAxios);

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
    origins: ["Seattle, WA"],
    destinations: ["San Francisco, CA", "New York, NY"],
    key: "foo"
  };

  expect(defaultParamsSerializer(params))
    .toEqual("destinations=San%20Francisco%2C%20CA|New%20York%2C%20NY&key=foo&origins=Seattle%2C%20WA");
});
