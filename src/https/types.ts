import { AxiosRequestConfig } from "axios";

export type RequestConfig = AxiosRequestConfig;

export type Result<T> =
  | { status: "SUCCESS"; body: T; statusCode: number }
  | { status: "FAILURE"; message: string; statusCode: number };
