import * as Comlink from "comlink";

import Module from "./msdfgen.js";
import { Renderer } from "./renderer";
import { FontData, ModuleType } from "./types";

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
  getImageData: () => {
    return renderer.imageData;
  },
  initCallbacks: (
    fontDataCallback: (data: FontData) => void,
    imageDataCallback: (data: ImageData) => void,
  ) => {
    renderer.fontDataCallback = fontDataCallback;
    renderer.imageDataCallback = imageDataCallback;
  },
};

Comlink.expose(obj);
