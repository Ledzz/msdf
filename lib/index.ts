import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import MsdfgenWorker from "./worker?worker";

export const createRenderer = () => {
  const worker = new MsdfgenWorker();
  return Comlink.wrap(worker);
};
