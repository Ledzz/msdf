import * as typr from "@fredli74/typr";

declare var Module;

console.log(Module);

export function library(data: ArrayBuffer) {
  const shape = new Module.Shape();

  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("A")[0];
  const path = font.glyphToPath(glyph);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);
  // console.log(path.cmds);
  const crds = new Module.VectorDouble();
  const cmds = new Module.VectorInt();

  // console.log(Module);
  for (let i = 0; i < path.crds.length; i++) {
    crds.push_back(path.crds[i]);
  }
  //
  for (let i = 0; i < path.cmds.length; i++) {
    cmds.push_back(path.cmds[i].charCodeAt(0));
  }

  const res = Module.generateMSDF(crds, cmds);

  const arr = [];

  for (let i = 0; i < res.size(); i++) {
    arr.push(res.get(i));
  }
  console.log(arr);

  renderBitmapToCanvas(arr);
  // const generateMSDF = Module.cwrap("generateOurMSDF", "null", [
  //   "array",
  //   "array",
  // ]);
  //
  // generateMSDF(
  //   path.crds,
  //   path.cmds.map((c) => c.charCodeAt(0)),
  // );
  crds.delete();
  cmds.delete();
  // console.log(shape, contour, edge);
}

function renderBitmapToCanvas(data: number[], width = 32, height = 32) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No context");
  }
  // const channels = bitmap.data.length / (bitmap.width * bitmap.height);
  const imageData = ctx.createImageData(width, height);
  const channels = 3;

  for (let i = 0; i < data.length; ++i) {
    for (let k = 0; k < channels; ++k) {
      imageData.data[i * channels + k] = data[i] * 255;
    }

    for (let k = channels; k < 4; ++k) {
      imageData.data[i * channels + k] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  document.body.append(canvas);
}
