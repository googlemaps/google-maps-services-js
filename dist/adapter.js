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
exports.customAdapter = exports.statusToCode = void 0;
const common_1 = require("./common");
const axios_1 = __importDefault(require("axios"));
function statusToCode(status) {
    switch (status) {
        case common_1.Status.OK:
        case common_1.Status.ZERO_RESULTS: {
            return 200;
        }
        case common_1.Status.INVALID_REQUEST:
        case common_1.Status.MAX_ROUTE_LENGTH_EXCEEDED:
        case common_1.Status.MAX_WAYPOINTS_EXCEEDED: {
            return 400;
        }
        case common_1.Status.REQUEST_DENIED: {
            return 403;
        }
        case common_1.Status.NOT_FOUND: {
            return 404;
        }
        case common_1.Status.OVER_DAILY_LIMIT:
        case common_1.Status.OVER_QUERY_LIMIT: {
            return 429;
        }
        case common_1.Status.UNKNOWN_ERROR: {
            return 500;
        }
        default: {
            return 200;
        }
    }
}
exports.statusToCode = statusToCode;
function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    }
    else {
        reject(new axios_1.default.AxiosError("Request failed with status code " + response.status, [axios_1.default.AxiosError.ERR_BAD_REQUEST, axios_1.default.AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
}
exports.customAdapter = axios_1.default.getAdapter((config) => {
    const httpAdapter = axios_1.default.getAdapter("http");
    return new Promise((resolve, reject) => {
        httpAdapter(config)
            .then((r) => {
            // unfortunately data is transformed after the adapter
            let data = r.data;
            if (config.transformResponse) {
                const t = Array.isArray(config.transformResponse)
                    ? config.transformResponse
                    : [config.transformResponse];
                for (const fn of t) {
                    data = fn.call(config, data, r.headers, r.status);
                }
            }
            if (r.status === 200 && data.status) {
                r.status = statusToCode(data.status);
            }
            settle(resolve, reject, r);
        })
            .catch(reject);
    });
});
//# sourceMappingURL=adapter.js.map