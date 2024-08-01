import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { Renderer } from "./index.ts";

import Module from "./msdfgen.js";

let renderer: Renderer;

const obj = {
  init: async () => {
    const module = await Module();
    renderer = new Renderer(module);
  },
  setFonts: () => {
    renderer.setFonts(["/Inter-Bold.otf"]);
  },
  addGlyphs: (charset) => {
    return renderer.addGlyphs(charset);
  },
};

Comlink.expose(obj);
