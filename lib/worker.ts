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
  addGlyphs: () => {
    return renderer.addGlyphs("ABCDEFGHIJKLMNOP");
  },
};

Comlink.expose(obj);
