import * as Comlink from "comlink";

import Module from "./wasm_app.js";
import { Renderer } from "./renderer";
import { FontInfo, ModuleType } from "./types";

let renderer: Renderer;

type RendererConstructorArgs = ConstructorParameters<typeof Renderer>;
type InitArgs = RendererConstructorArgs extends [ModuleType, ...infer Rest]
  ? Rest
  : never;

const obj = {
  init: async (...args: InitArgs) => {
    const module = await Module();
    renderer = new Renderer(module, ...args);
  },
  setFonts: (
    ...args: Parameters<Renderer["setFonts"]>
  ): ReturnType<Renderer["setFonts"]> => {
    return renderer.setFonts(...args);
  },
  addGlyphs: (
    ...args: Parameters<Renderer["addGlyphs"]>
  ): ReturnType<Renderer["addGlyphs"]> => {
    return renderer.addGlyphs(...args);
  },
  initCallbacks: (
    fontDataCallback: (data: FontInfo) => void,
    imageDataCallback: (data: ImageData) => void,
  ) => {
    renderer.fontDataCallback = fontDataCallback;
    renderer.imageDataCallback = imageDataCallback;
  },
};
export type WorkerAPI = typeof obj;

Comlink.expose(obj);
