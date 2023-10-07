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

import { Status } from "./common";

import axios from "axios";
import type { AxiosResponse } from "axios";

export function statusToCode(status: Status): number {
  switch (status) {
    case Status.OK:
    case Status.ZERO_RESULTS: {
      return 200;
    }
    case Status.INVALID_REQUEST:
    case Status.MAX_ROUTE_LENGTH_EXCEEDED:
    case Status.MAX_WAYPOINTS_EXCEEDED: {
      return 400;
    }
    case Status.REQUEST_DENIED: {
      return 403;
    }
    case Status.NOT_FOUND: {
      return 404;
    }
    case Status.OVER_DAILY_LIMIT:
    case Status.OVER_QUERY_LIMIT: {
      return 429;
    }
    case Status.UNKNOWN_ERROR: {
      return 500;
    }
    default: {
      return 200;
    }
  }
}

function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(
      new axios.AxiosError(
        "Request failed with status code " + response.status,
        [axios.AxiosError.ERR_BAD_REQUEST, axios.AxiosError.ERR_BAD_RESPONSE][
          Math.floor(response.status / 100) - 4
        ],
        response.config,
        response.request,
        response
      )
    );
  }
}

export const customAdapter = axios.getAdapter((config) => {
  const httpAdapter = axios.getAdapter("http");

  return new Promise((resolve, reject) => {
    httpAdapter(config)
      .then((r: AxiosResponse) => {
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
