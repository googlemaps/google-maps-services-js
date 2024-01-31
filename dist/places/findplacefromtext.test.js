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
const findplacefromtext_1 = require("./findplacefromtext");
const common_1 = require("../common");
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("autocomplete should call axios correctly", () => {
    const params = {
        input: "google",
        inputtype: common_1.PlaceInputType.textQuery,
        key: "foo",
        fields: ["place_id", "name"],
    };
    (0, findplacefromtext_1.findPlaceFromText)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        paramsSerializer: findplacefromtext_1.defaultParamsSerializer,
        url: findplacefromtext_1.defaultUrl,
    });
});
//# sourceMappingURL=findplacefromtext.test.js.map