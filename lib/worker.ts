import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

import Module from "./msdfgen.js";
import { Renderer } from "./renderer";

let renderer: Renderer;

const obj = {
  init: async () => {
    const module = await Module();
    renderer = new Renderer(module);
  },
  setFonts: () => {
    renderer.setFonts(["/Inter-Bold.otf"]);
  },
  addGlyphs: (charset: string) => {
    return renderer.addGlyphs(charset);
  },
};

Comlink.expose(obj);
