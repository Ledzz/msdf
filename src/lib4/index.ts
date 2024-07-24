import * as typr from "@fredli74/typr";
import { Path } from "@fredli74/typr";

abstract class Segment {
  points: Vector2[];
}
class LineSegment extends Segment {
  points: [Vector2, Vector2];
  constructor(p1: Vector2, p2: Vector2) {
    super();
    this.points = [p1, p2];
  }
}
class CubicSegment extends Segment {
  points: [Vector2, Vector2, Vector2, Vector2];
  constructor(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2) {
    super();
    this.points = [p1, p2, p3, p4];
  }
}

class Shape {
  contours: Contour[] = [];
  inverseYAxis: boolean = false;
  static fromPath(path: Path): Shape {
    const shape = new Shape();
    let crdsi = 0;
    let contour: Contour = {
      edges: [],
    };
    let point: Vector2 | undefined;
    let firstPoint: Vector2 | undefined;

    path.cmds.forEach((cmd) => {
      switch (cmd) {
        case "M":
          point = new Vector2(path.crds[crdsi++], path.crds[crdsi++]);
          firstPoint = point.clone();
          break;

        case "L": {
          if (!point) {
            throw new Error("No prev point for line");
          }

          const line = new LineSegment(
            point,
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
          );
          contour.edges.push(new Edge(line));
          point = line.points[1].clone();
          break;
        }

        case "Q":
          // TODO: Parse quadratic segment
          throw new Error("Quadratic segment not implemented");

        case "C":
          if (!point) {
            throw new Error("No prev point for cubic");
          }
          const cubic = new CubicSegment(
            point,
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
            new Vector2(path.crds[crdsi++], path.crds[crdsi++]),
          );
          contour.edges.push(new Edge(cubic));
          point = cubic.points[3].clone();
          break;

        case "Z": {
          if (!point || !firstPoint) {
            throw new Error("No prev point for close");
          }
          const line = new LineSegment(point, firstPoint);
          contour.edges.push(new Edge(line));

          shape.contours.push(contour);

          contour = {
            edges: [],
          };
          break;
        }
      }
    });

    return shape;
  }
}
class Contour {
  edges: Edge[];
}
class Edge {
  constructor(public segment: Segment) {}
  signedDistance(p: Vector2): [SignedDistance, number] {
    return [new SignedDistance(), 0];
  }
  color: number;
  distanceToPerpendicularDistance(
    minDistance: SignedDistance,
    p: Vector2,
    nearParam: number,
  ) {}
}

class DistanceMapping {
  constructor(range: Range) {}

  fn(distance: number) {
    return 0;
  }
}
class Range {}
class SignedDistance {
  distance: number;
}
class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}
  div(v: Vector2): Vector2 {
    return new Vector2(this.x / v.x, this.y / v.y);
  }
  sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
type ErrorCorrectionConfig = {};
class Bitmap {
  width: number;
  height: number;
  data: number[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = [];
  }
}

const BLACK = 0;
const RED = 1;
const GREEN = 2;
const YELLOW = 3;
const BLUE = 4;
const MAGENTA = 5;
const CYAN = 6;
const WHITE = 7;

type Colored = {
  minDistance: SignedDistance;
  nearEdge: Edge | null;
  nearParam: number;
};

function generateMSDF(
  output: Bitmap,
  shape: Shape,
  range: Range,
  scale: Vector2,
  translate: Vector2,
  errorCorrectionConfig: ErrorCorrectionConfig,
) {
  const distanceMapping = new DistanceMapping(range);

  for (let y = 0; y < output.height; ++y) {
    const row = shape.inverseYAxis ? output.height - y - 1 : y;
    for (let x = 0; x < output.width; ++x) {
      const p = new Vector2(x + 0.5, y + 0.5).div(scale).sub(translate);

      const r: Colored = {
        minDistance: new SignedDistance(),
        nearEdge: null,
        nearParam: 0,
      };
      const g: Colored = {
        minDistance: new SignedDistance(),
        nearEdge: null,
        nearParam: 0,
      };
      const b: Colored = {
        minDistance: new SignedDistance(),
        nearEdge: null,
        nearParam: 0,
      };

      for (const contour of shape.contours) {
        for (const edge of contour.edges) {
          const [distance, param] = edge.signedDistance(p);
          if (edge.color & RED && distance < r.minDistance) {
            r.minDistance = distance;
            r.nearEdge = edge;
            r.nearParam = param;
          }
          if (edge.color & GREEN && distance < g.minDistance) {
            g.minDistance = distance;
            g.nearEdge = edge;
            g.nearParam = param;
          }
          if (edge.color & BLUE && distance < b.minDistance) {
            b.minDistance = distance;
            b.nearEdge = edge;
            b.nearParam = param;
          }
        }
      }

      if (r.nearEdge)
        r.nearEdge.distanceToPerpendicularDistance(
          r.minDistance,
          p,
          r.nearParam,
        );
      if (g.nearEdge)
        g.nearEdge.distanceToPerpendicularDistance(
          g.minDistance,
          p,
          g.nearParam,
        );
      if (b.nearEdge)
        b.nearEdge.distanceToPerpendicularDistance(
          b.minDistance,
          p,
          b.nearParam,
        );
      output.data[x + row * output.width] = distanceMapping.fn(
        r.minDistance.distance,
      );
      output.data[x + row * output.width + 1] = distanceMapping.fn(
        g.minDistance.distance,
      );
      output.data[x + row * output.width + 2] = distanceMapping.fn(
        b.minDistance.distance,
      );
    }
  }
}

export function library(data: ArrayBuffer) {
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("A")[0];
  const path = font.glyphToPath(glyph);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);

  const shape = Shape.fromPath(path);
  // edgeColoringSimple(shape, 0);
  // generatePSDF(shape);
  const bitmap = new Bitmap(64, 64);
  const range = new Range();
  const scale = new Vector2(1, 1);
  const translate = new Vector2(0, 0);
  generateMSDF(bitmap, shape, range, scale, translate, {});
}
