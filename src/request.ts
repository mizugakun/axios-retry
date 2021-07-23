import * as https from "./https";

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

export async function getRandomNumber(min: number, max: number) {
  const requestOpt = RandNumRequest.getRandomNumber(min, max);
  const response = await https.request<number>(requestOpt);

  if (response.status === "FAILURE") {
    console.log("cannot retrieve value");
    console.log(response);
  } else {
    console.log("value is", response.body);
  }
}
