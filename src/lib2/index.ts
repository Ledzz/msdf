import * as typr from "@fredli74/typr";
import { generate } from "./generate";

export function library(data: ArrayBuffer) {
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("R")[0];
  const path = font.glyphToPath(glyph);

  const svgPath = font.pathToSVG(path);

  const sdfImageData = generate(
    256, // width
    256, // height
    svgPath, // path
    [0, 0, 2048, 2048], // viewBox
    25, // maxDistance
    0.5, // exponent
  );
  debugData(sdfImageData, 256, 256);
  console.log(sdfImageData);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${svgPath}" fill="black" />`;
  document.body.append(svg);
}

function debugData(data: Uint8Array, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.append(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  const imageData = ctx.createImageData(width, height);

  for (let i = 0; i < data.length; i++) {
    imageData.data[4 * i] = data[i];
    imageData.data[4 * i + 1] = data[i];
    imageData.data[4 * i + 2] = data[i];
    imageData.data[4 * i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}
