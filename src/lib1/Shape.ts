import { Contour } from "./Contour.ts";
import { Path } from "@fredli74/typr";
import { CubicSegment, LineSegment } from "./Segment.ts";
import { Vector2 } from "./Vector2.ts";

export class Shape {
  contours: Contour[] = [];
  inverseYAxis = true;

  static fromPath(path: Path) {
    let crdsi = 0;
    let contour = new Contour();
    let point: Vector2 | undefined;

    const shape = new Shape();

    path.cmds.forEach((cmd) => {
      switch (cmd) {
        case "M":
          point = new Vector2(path.crds[crdsi++], path.crds[crdsi++]);
          break;

        case "L":
          const line = new LineSegment();
          line.points = [
            point,
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
          ];
          contour.edges.push(line);
          point = line.points[1].clone();
          break;

        case "C":
          const cubic = new CubicSegment();
          cubic.points = [
            point,
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
          ];
          contour.edges.push(cubic);
          point = cubic.points[3].clone();
          break;

        case "Z":
          shape.contours.push(contour);
          contour = new Contour();
          break;
      }
    });

    return shape;
  }

  normalize() {
    // for (std::vector<Contour>::iterator contour = contours.begin(); contour != contours.end(); ++contour) {
    //     if (contour->edges.size() == 1) {
    //         EdgeSegment *parts[3] = { };
    //         contour->edges[0]->splitInThirds(parts[0], parts[1], parts[2]);
    //         contour->edges.clear();
    //         contour->edges.push_back(EdgeHolder(parts[0]));
    //         contour->edges.push_back(EdgeHolder(parts[1]));
    //         contour->edges.push_back(EdgeHolder(parts[2]));
    //     } else {
    //         // Push apart convergent edge segments
    //         EdgeHolder *prevEdge = &contour->edges.back();
    //         for (std::vector<EdgeHolder>::iterator edge = contour->edges.begin(); edge != contour->edges.end(); ++edge) {
    //             Vector2 prevDir = (*prevEdge)->direction(1).normalize();
    //             Vector2 curDir = (*edge)->direction(0).normalize();
    //             if (dotProduct(prevDir, curDir) < MSDFGEN_CORNER_DOT_EPSILON-1) {
    //                 double factor = DECONVERGE_OVERSHOOT*sqrt(1-(MSDFGEN_CORNER_DOT_EPSILON-1)*(MSDFGEN_CORNER_DOT_EPSILON-1))/(MSDFGEN_CORNER_DOT_EPSILON-1);
    //                 Vector2 axis = factor*(curDir-prevDir).normalize();
    //                 // Determine curve ordering using third-order derivative (t = 0) of crossProduct((*prevEdge)->point(1-t)-p0, (*edge)->point(t)-p0) where p0 is the corner (*edge)->point(0)
    //                 if (crossProduct((*prevEdge)->directionChange(1), (*edge)->direction(0))+crossProduct((*edge)->directionChange(0), (*prevEdge)->direction(1)) < 0)
    //                 axis = -axis;
    //                 deconvergeEdge(*prevEdge, 1, axis.getOrthogonal(true));
    //                 deconvergeEdge(*edge, 0, axis.getOrthogonal(false));
    //             }
    //             prevEdge = &*edge;
    //         }
    //     }
    // }
  }
}
