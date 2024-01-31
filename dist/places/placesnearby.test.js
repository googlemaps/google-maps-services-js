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
const placesnearby_1 = require("./placesnearby");
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
afterEach(() => {
    jest.clearAllMocks();
});
test("autocomplete should call axios correctly", () => {
    const params = {
        location: { lat: 35, lng: -110 },
        key: "foo",
        ranking: placesnearby_1.PlacesNearbyRanking.distance,
    };
    (0, placesnearby_1.placesNearby)({ params: params }, mockedAxios);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: "get",
        params: params,
        url: placesnearby_1.defaultUrl,
        paramsSerializer: placesnearby_1.defaultParamsSerializer,
    });
});
//# sourceMappingURL=placesnearby.test.js.map