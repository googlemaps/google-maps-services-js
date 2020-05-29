import * as settle from "axios/lib/core/settle";
import * as defaults from "axios/lib/defaults";
import * as transformData from "axios/lib/core/transformData";
import { Status } from "./common";
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";

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

export const customAdapter = (config: AxiosRequestConfig): AxiosPromise<any> =>
  new Promise((resolve, reject) => {
    defaults
      .adapter(config)
      .then((r: AxiosResponse) => {
        // unfortunately data is transformed after the adapter
        r.data = transformData(r.data, r.headers, config.transformResponse);
        if (r.status === 200 && r.data.status) {
          r.status = statusToCode(r.data.status);
        }
        settle(resolve, reject, r);
      })
      .catch(reject);
  });
