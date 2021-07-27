import { getRandomNumber } from "./request";

async function getRand() {
  const res = await getRandomNumber(0, 1000000001);
  console.log(res);
}
getRand();
