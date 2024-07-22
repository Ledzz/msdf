// generateDistanceField<OverlappingContourCombiner<MultiDistanceSelector> >(output, shape, transformation);

import { Bitmap } from "./Bitmap.ts";
import { Shape } from "./Shape.ts";
import { SDFTransform } from "./SDFTransform.ts";

export function generateMSDF(
  output: Bitmap,
  shape: Shape,
  transform: SDFTransform,
) {
  return generateDistanceField(
    output,
    shape,
    transform,
    OverlappingContourCombiner,
    MultiDistanceSelector,
  );
}

export function generateSDF(
  output: Bitmap,
  shape: Shape,
  transform: SDFTransform,
) {
  return generateDistanceField(
    output,
    shape,
    transform,
    OverlappingContourCombiner,
    TrueDistanceSelector,
  );
}

function generateDistanceField(
  output: Bitmap,
  shape: Shape,
  transform: SDFTransform,
  edgeSelector: typeof EdgeSelector,
  distanceFinder: typeof DistanceFinder,
) {
  // const distanceFinder = new distanceFinder(shape);
  // let rightToLeft = false;
  //
  // for (let y = 0; y < output.height; ++y) {
  //   const row = shape.inverseYAxis ? output.height - y - 1 : y;
  //   for (let col = 0; col < output.width; ++col) {
  //     const x = rightToLeft ? output.width - col - 1 : col;
  //     const p = transformation.unproject({ x: x + 0.5, y: y + 0.5 });
  //     const distance = distanceFinder.distance(p);
  //     distancePixelConversion.convert(output(x, row), distance);
  //   }
  //   rightToLeft = !rightToLeft;
  // }
}

class EdgeSelector {}

class OverlappingContourCombiner extends EdgeSelector {}

class DistanceFinder {
  shape: Shape;
  constructor(shape: Shape) {
    this.shape = shape;
  }
}
class MultiDistanceSelector extends DistanceFinder {}
class TrueDistanceSelector extends DistanceFinder {}
