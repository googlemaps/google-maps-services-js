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
const queryautocomplete_1 = require("./queryautocomplete");
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("autocomplete should call axios correctly", () => {
    const params = { input: "Seattle", sessiontoken: "asdf", key: "foo" };
    (0, queryautocomplete_1.placeQueryAutocomplete)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        paramsSerializer: queryautocomplete_1.defaultParamsSerializer,
        url: queryautocomplete_1.defaultUrl,
    });
});
//# sourceMappingURL=queryautocomplete.test.js.map