import axios, { AxiosInstance } from "axios";
import { HttpsAgent } from "agentkeepalive";
export const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
export const defaultTimeout = 10000;

export const defaultAxiosInstance = axios.create({
  timeout: defaultTimeout,
  httpsAgent: defaultHttpsAgent
});
