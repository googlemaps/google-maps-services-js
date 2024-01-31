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
const timezone_1 = require("./timezone");
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("elevation should call axios correctly", () => {
    const params = {
        location: { lat: 35, lng: -110 },
        timestamp: 999999999,
        key: "foo",
    };
    (0, timezone_1.timezone)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        paramsSerializer: timezone_1.defaultParamsSerializer,
        url: timezone_1.defaultUrl,
    });
});
test("serializer should handle date object", () => {
    const dt = new Date();
    expect((0, timezone_1.defaultParamsSerializer)({ timestamp: dt })).toEqual(`timestamp=${Math.round(Number(dt) / 1000)}`);
});
//# sourceMappingURL=timezone.test.js.map