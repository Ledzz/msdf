import * as Comlink from "comlink";
import MsdfgenWorker from "./worker?worker";
import { WorkerAPI } from "./types.ts";
import { signal } from "@preact/signals-core";
import { FontData } from "three/examples/jsm/loaders/FontLoader";

export const createRenderer = () => {
  const fontData = signal<FontData>();
  const imageData = signal<ImageData>();
  const worker = new MsdfgenWorker();
  return Comlink.wrap<WorkerAPI>(worker);
};
