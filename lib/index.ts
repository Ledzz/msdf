import * as Comlink from "comlink";
import MsdfgenWorker from "./worker?worker";
import { FontInfo, Options, WorkerAPI } from "./types.ts";
import { signal } from "@preact/signals-core";

export const createRenderer = async (options?: Options) => {
  const fontData = signal<FontInfo>();
  const imageData = signal<ImageData>();

  const fontDataCallback = (data: FontInfo) => {
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
