import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

import Module from "./msdfgen.js";
import { Renderer } from "./renderer";

let renderer: Renderer;

const obj = {
  init: async () => {
    const module = await Module();
    renderer = new Renderer(module);
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
};

Comlink.expose(obj);
