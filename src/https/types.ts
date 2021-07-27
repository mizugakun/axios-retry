import { AxiosRequestConfig } from "axios";

export type RequestConfig = AxiosRequestConfig;

export type Result<T> =
  | { status: "SUCCESS"; body: T; statusCode: number }
  | { status: "FAILURE"; message: string; statusCode?: number };

export type RetryConfig = {
  retryStatusCodes: number[];
  retries: number;
  delayMS: number;
  updateConfig: (config: RequestConfig) => Promise<RequestConfig>;
};
