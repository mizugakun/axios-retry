import { Result, RequestConfig } from "./types";
import * as rax from "retry-axios";
import axios from "axios";

// Attach retry-axios
rax.attach();

export async function request<T>(options: RequestConfig): Promise<Result<T>> {
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
