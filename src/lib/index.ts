import * as typr from "@fredli74/typr";
import { Bitmap } from "./core/Bitmap.ts";
import { SDFTransform } from "./core/SDFTransform.ts";
import { Shape } from "./core/Shape.ts";
import { edgeColoringSimple } from "./core/edgeColoring.ts";

export function library(data: ArrayBuffer) {
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("R")[0];
  const path = font.glyphToPath(glyph);
  // TODO: 4.1.3.1 Edge pruning
  console.log(path);

  // const shape = Shape.fromPath(path);
  // console.log(shape);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);

  const output = new Bitmap(10, 10);
  const transform = new SDFTransform();
  const shape = Shape.fromPath(path);
  edgeColoringSimple(shape, 3.0);
  console.log(shape);
  // generateDistanceField(output, shape, transform);

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

// function generateDistanceField(
//   output: Bitmap,
//   shape: Shape,
//   transform: SDFTransform,
// ) {
//   const distanceFinder = new MSDFDistanceFinder(shape);
//   for (let y = 0; y < output.height; y++) {
//     const row = shape.inverseYAxis ? output.height - y - 1 : y;
//     for (let x = 0; x < output.width; x++) {
//       const distance = distanceFinder.distance(new Point2(x, y));
//       console.log(distance);
//       // constp = transform.unproject(new Point2(x, y));
//     }
//   }
// }
