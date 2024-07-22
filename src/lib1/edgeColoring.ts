import { Shape } from "./Shape.ts";

export enum EdgeColor {
  BLACK = 0,
  RED = 1,
  GREEN = 2,
  YELLOW = 3,
  BLUE = 4,
  MAGENTA = 5,
  CYAN = 6,
  WHITE = 7,
}

export function edgeColoring(shape: Shape) {
  shape.contours.forEach((contour) => {
    let current =
      contour.edges.length === 1 ? EdgeColor.WHITE : EdgeColor.MAGENTA;
    contour.edges.forEach((edge) => {
      edge.color = current;
      current =
        current === EdgeColor.YELLOW ? EdgeColor.CYAN : EdgeColor.YELLOW;
    });
  });
}
