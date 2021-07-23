import { Result, RequestConfig } from "./types";
import * as rax from "retry-axios";
import axios from "axios";
import { getRandomNumber } from "../request";

// Attach retry-axios
rax.attach();

export async function request<T>(options: RequestConfig): Promise<Result<T>> {
  const retryConfig: rax.RetryConfig = {
    retry: 3,
    retryDelay: 100,
    onRetryAttempt: (err) => {
      const cfg = rax.getConfig(err);
      console.log(`Retry attempt #${cfg?.currentRetryAttempt}`);
    },
  };

  const raxOption: rax.RaxConfig = {
    raxConfig: retryConfig,
    ...options,
  };

  try {
    const response = await axios(raxOption);
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
