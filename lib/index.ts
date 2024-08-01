import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import MsdfgenWorker from "./worker?worker";

const worker = new MsdfgenWorker();
const obj = Comlink.wrap(worker);

export async function init() {
  await obj.init();
  await obj.setFonts();
}

export async function addGlyphs(charset: string) {
  return await obj.addGlyphs(charset);
}
