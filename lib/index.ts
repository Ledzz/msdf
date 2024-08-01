import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import MsdfgenWorker from "./worker?worker";
import { WorkerAPI } from "./types.ts";

export const createRenderer = () => {
  const worker = new MsdfgenWorker();
  return Comlink.wrap<WorkerAPI>(worker);
};
