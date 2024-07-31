import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import MyWorker from "./worker?worker";

const worker = new MyWorker();
const obj = Comlink.wrap(worker);

export async function init() {
  await obj.init();
  await obj.setFonts();
}

export async function addGlyphs() {
  return await obj.addGlyphs();
}
