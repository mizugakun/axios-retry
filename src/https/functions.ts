import { Result, RequestConfig, RetryConfig } from "./types";
import axios from "axios";

export async function request<T>(
  options: RequestConfig,
  retryConfig?: RetryConfig
): Promise<Result<T>> {
  if (retryConfig === undefined) {
    return makeRequest(options);
  }

  let res;
  for (let i = 0; i <= retryConfig.retries; i++) {
    res = await makeRequest<T>(options);
    if (res.status === "SUCCESS" || i === retryConfig.retries) {
      return res;
    }
    if (
      res.statusCode! &&
      retryConfig.retryStatusCodes.includes(res.statusCode)
    ) {
      options = await retryConfig.updateConfig(options);
      await wait(retryConfig.delayMS);
    } else {
      break;
    }
  }

  return res
    ? res
    : {
        status: "FAILURE",
        message: "fail to request",
        statusCode: 502,
      };
}

async function makeRequest<T>(options: RequestConfig): Promise<Result<T>> {
  try {
    const response = await axios(options);
    return {
      status: "SUCCESS",
      body: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "FAILURE",
      message: error.response?.code ?? error.response?.data,
      statusCode: error.response?.status,
    };
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
