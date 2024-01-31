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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nock_1 = __importDefault(require("nock"));
const client_1 = require("./client");
const common_1 = require("./common");
const adapter_1 = require("./adapter");
beforeAll(() => {
    nock_1.default.disableNetConnect();
});
afterAll(() => {
    nock_1.default.cleanAll();
    nock_1.default.enableNetConnect();
});
test("httpadapter rejects Status.NOT_FOUND", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, nock_1.default)("https://maps.googleapis.com")
        .get("/maps/api/place/details/json?fields=place_id,name&key=foo&place_id=notarealid")
        .reply(200, JSON.stringify({ status: common_1.Status.NOT_FOUND }), {
        "Content-Type": "application/json",
    });
    const client = new client_1.Client();
    const params = {
        place_id: "notarealid",
        key: "foo",
        fields: ["place_id", "name"],
    };
    yield expect(client.placeDetails({ params: params })).rejects.toEqual(Error("Request failed with status code 404"));
}));
test("httpadapter resolves Status.OK", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = { status: common_1.Status.OK };
    (0, nock_1.default)("https://maps.googleapis.com")
        .get("/maps/api/place/details/json?fields=place_id,name&key=foo&place_id=notarealid")
        .reply(200, JSON.stringify(response), {
        "Content-Type": "application/json",
    });
    const client = new client_1.Client();
    const params = {
        place_id: "notarealid",
        key: "foo",
        fields: ["place_id", "name"],
    };
    const r = yield client.placeDetails({ params: params });
    expect(r.data).toEqual(response);
}));
test("statusToCode returns correct value", () => {
    expect((0, adapter_1.statusToCode)(common_1.Status.OK)).toEqual(200);
    expect((0, adapter_1.statusToCode)(common_1.Status.ZERO_RESULTS)).toEqual(200);
    expect((0, adapter_1.statusToCode)(common_1.Status.INVALID_REQUEST)).toEqual(400);
    expect((0, adapter_1.statusToCode)(common_1.Status.MAX_ROUTE_LENGTH_EXCEEDED)).toEqual(400);
    expect((0, adapter_1.statusToCode)(common_1.Status.MAX_WAYPOINTS_EXCEEDED)).toEqual(400);
    expect((0, adapter_1.statusToCode)(common_1.Status.REQUEST_DENIED)).toEqual(403);
    expect((0, adapter_1.statusToCode)(common_1.Status.NOT_FOUND)).toEqual(404);
    expect((0, adapter_1.statusToCode)(common_1.Status.OVER_DAILY_LIMIT)).toEqual(429);
    expect((0, adapter_1.statusToCode)(common_1.Status.OVER_QUERY_LIMIT)).toEqual(429);
    expect((0, adapter_1.statusToCode)(common_1.Status.UNKNOWN_ERROR)).toEqual(500);
    expect((0, adapter_1.statusToCode)("foo")).toEqual(200);
});
//# sourceMappingURL=adapter.test.js.map