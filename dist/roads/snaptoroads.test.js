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
const snaptoroads_1 = require("./snaptoroads");
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("snapToRoads should call axios correctly", () => {
    const params = { path: ["0,0"], key: "foo" };
    (0, snaptoroads_1.snapToRoads)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        paramsSerializer: snaptoroads_1.defaultParamsSerializer,
        url: snaptoroads_1.defaultUrl,
    });
});
test("serializer should transform correctly", () => {
    const params = { path: ["0,0"], key: "foo" };
    expect((0, snaptoroads_1.defaultParamsSerializer)(params)).toEqual("key=foo&path=0%2C0");
});
//# sourceMappingURL=snaptoroads.test.js.map