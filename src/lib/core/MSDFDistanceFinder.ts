import { Shape } from "./Shape.ts";
import { Vector2 } from "./Vector2.ts";

export class MSDFDistanceFinder {
  constructor(public shape: Shape) {}

  distance(p: Vector2) {
    for (const contour of this.shape.contours) {
      for (const edge of contour.edges) {
        const distance = edge.segment.signedDistance(p);
        // if (edge.color & RED && distance.lessThan(r.minDistance)) {
        //     r.minDistance.update(distance.distance);
        //     r.nearEdge = edge;
        //     r.nearParam = 0;
        // }
        // if (edge.color & GREEN && distance.lessThan(g.minDistance)) {
        //     g.minDistance.update(distance.distance);
        //     g.nearEdge = edge;
        //     g.nearParam = 0;
        // }
        // if (edge.color & BLUE && distance.lessThan(b.minDistance)) {
        //     b.minDistance.update(distance.distance);
        //     b.nearEdge = edge;
        //     b.nearParam = 0;
        // }
        return distance;
      }
    }
  }
}
