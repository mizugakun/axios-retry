import * as https from "./https";
import { RetryConfig } from "./https";

class RandNumRequest {
  private static readonly option: https.RequestConfig = {
    baseURL: "https://www.random.org",
  };

  static getRandomNumber(min: number, max: number): https.RequestConfig {
    return {
      ...this.option,
      method: "GET",
      url: `/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
    };
  }
}

export async function getRandomNumber(
  min: number,
  max: number
): Promise<https.Result<number>> {
  const requestOpt = RandNumRequest.getRandomNumber(min, max);
  const retryConfig = generateRetryConfig();
  const response = await https.request<number>(requestOpt, retryConfig);
  return response;
}

async function getNextConfig(): Promise<https.RequestConfig> {
  const options = RandNumRequest.getRandomNumber(1, 10);
  return options;
}

async function getNextConfig2(
  options: https.RequestConfig
): Promise<https.RequestConfig> {
  options.url = `/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new`;
  return options;
}

function generateRetryConfig(): RetryConfig {
  return {
    retries: 2,
    retryStatusCodes: [503],
    delayMS: 200,
    updateConfig: getNextConfig,
  };
}
