import * as Comlink from "comlink";
import MsdfgenWorker from "./worker?worker";
import { Options, WorkerAPI } from "./types.ts";
import { signal } from "@preact/signals-core";
import { FontData } from "three/examples/jsm/loaders/FontLoader";

export const createRenderer = async (options?: Options) => {
  const fontData = signal<FontData>();
  const imageData = signal<ImageData>();

  const fontDataCallback = (data: FontData) => {
    fontData.value = data;
  };
  const imageDataCallback = (data: ImageData) => {
    imageData.value = data;
  };

  const worker = new MsdfgenWorker();

  const api = Comlink.wrap<WorkerAPI>(worker);

  await api.init(options);
  await api.initCallbacks(
    Comlink.proxy(fontDataCallback),
    Comlink.proxy(imageDataCallback),
  );
  return { renderer: api, fontData, imageData };
};
