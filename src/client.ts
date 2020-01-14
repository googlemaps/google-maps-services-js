import axios from "axios";
import { version } from "./index";
import { HttpsAgent } from "agentkeepalive";
export const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
export const defaultTimeout = 10000;

export const defaultAxiosInstance = axios.create({
  timeout: defaultTimeout,
  httpsAgent: defaultHttpsAgent,
  headers: { Referer: `google-maps-services-js-${version}` }
});
