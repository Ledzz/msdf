import { Bitmap } from "./Bitmap.ts";
import { Shape } from "./Shape.ts";
import { SDFTransform } from "./SDFTransform.ts";
import { Vector2 } from "./Vector2.ts";

export function generateMSDF(
  output: Bitmap,
  shape: Shape,
  transform: SDFTransform,
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  canvas.width = output.width;
  canvas.height = output.height;
  document.body.appendChild(canvas);
  const imageData = ctx.createImageData(output.width, output.height);

  const arr = [];

  let min = Infinity;
  let max = -Infinity;

  for (let y = 0; y < output.height; ++y) {
    for (let x = 0; x < output.width; ++x) {
      const [r, g, b] = generatePixel(
        new Vector2((x / output.width) * 2000, (y / output.height) * 2000),
        shape,
        transform,
      );
      const [ri, gi, bi, ai] = getColorIndicesForCoord(x, y, output.width);
      if (r < min) {
        min = r;
      }
      if (r > max) {
        max = r;
      }
      arr[ri] = r;
      arr[gi] = g;
      arr[bi] = b;
      arr[ai] = 1;
    }
  }

  for (let y = 0; y < output.height; ++y) {
    for (let x = 0; x < output.width; ++x) {
      const [ri, gi, bi, ai] = getColorIndicesForCoord(x, y, output.width);
      imageData.data[ri] = map(arr[ri], min, max, 0, 255);
      imageData.data[gi] = map(arr[gi], min, max, 0, 255);
      imageData.data[bi] = map(arr[bi], min, max, 0, 255);
      imageData.data[ai] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function map(
  value: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
) {
  return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}
function getColorIndicesForCoord(x: number, y: number, width: number) {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}
function generatePixel(point: Vector2, shape: Shape, transform: SDFTransform) {
  let r = Infinity;
  let g = Infinity;
  let b = Infinity;
  let eRed, eGreen, eBlue;

  // MSDF
  // shape.contours.forEach((contour) => {
  //   contour.edges.forEach((edge) => {
  //     const d = edge.signedDistance(point);
  //     if (edge.color & EdgeColor.RED && d < r) {
  //       r = d;
  //       eRed = edge;
  //     }
  //     if (edge.color & EdgeColor.GREEN && d < g) {
  //       g = d;
  //       eGreen = edge;
  //     }
  //     if (edge.color & EdgeColor.BLUE && d < b) {
  //       b = d;
  //       eBlue = edge;
  //     }
  //
  //     r = eRed?.pseudoDistance(point) ?? 0;
  //     g = eGreen?.pseudoDistance(point) ?? 0;
  //     b = eBlue?.pseudoDistance(point) ?? 0;
  //   });
  // });

  shape.contours.forEach((contour) => {
    contour.edges.forEach((edge) => {
      const d = edge.signedDistance(point);

      r = d < r ? d : r;
      g = d < g ? d : g;
      b = d < b ? d : b;
    });
  });

  return [r, g, b];
}
