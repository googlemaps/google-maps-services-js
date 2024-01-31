"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const directions_1 = require("./directions");
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("elevation should call axios correctly", () => {
    const params = {
        origin: "Seattle, WA",
        destination: "San Francisco, CA",
        key: "foo",
    };
    (0, directions_1.directions)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        paramsSerializer: directions_1.defaultParamsSerializer,
        url: directions_1.defaultUrl,
    });
});
test("serializer should transform correctly", () => {
    const params = {
        origin: "Seattle, WA",
        destination: "San Francisco, CA",
        key: "foo",
    };
    expect((0, directions_1.defaultParamsSerializer)(params)).toEqual("destination=San%20Francisco%2C%20CA&key=foo&origin=Seattle%2C%20WA");
});
//# sourceMappingURL=directions.test.js.map