import * as typr from "@fredli74/typr";
import { Shape } from "./Shape.ts";
import { edgeColoring } from "./edgeColoring.ts";
import { Bitmap } from "./Bitmap.ts";
import { SDFTransform } from "./SDFTransform.ts";
import { generateMSDF } from "./generateMSDF.ts";

export function library(data: ArrayBuffer) {
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("R")[0];
  const path = font.glyphToPath(glyph);
  // TODO: 4.1.3.1 Edge pruning
  console.log(path);

  const shape = Shape.fromPath(path);

  edgeColoring(shape);
  console.log(shape);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);

  const output = new Bitmap(100, 100);
  const transform = new SDFTransform();

  generateMSDF(output, shape, transform);
  // const shape = Shape.fromPath(path);
  // edgeColoringSimple(shape, 3.0);
  // generateSDF(output, shape, transform);
  // console.log(shape, output);
  // const shape = new Shape();
  // if (loadGlyph(shape, font, 'A', FontCoordinateScaling.FONT_SCALING_EM_NORMALIZED)) {
  //   shape.normalize();
  //   //                      max. angle
  //   edgeColoringSimple(shape, 3.0);
  //   //          output width, height
  //   Bitmap<float, 3> msdf(32, 32);
  //   //                            scale, translation (in em's)
  //   SDFTransformation t(Projection(32.0, Vector2(0.125, 0.125)), Range(0.125));
  //   generateMSDF(msdf, shape, t);
  //   savePng(msdf, "output.png");
  // }
  // destroyFont(font);
}
