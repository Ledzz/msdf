import * as typr from "@fredli74/typr";
import { Path } from "@fredli74/typr";

type DistanceWithParam = [SignedDistance, number];

abstract class Segment {
  points: Vector2[];

  abstract signedDistance(p: Vector2): DistanceWithParam;

  abstract direction(p: number);
}
class LineSegment extends Segment {
  points: [Vector2, Vector2];
  constructor(p1: Vector2, p2: Vector2) {
    super();
    this.points = [p1, p2];
  }

  signedDistance(p: Vector2) {
    const aq = p.sub(this.points[0]);
    const ab = this.points[1].sub(this.points[0]);
    const param = aq.dot(ab) / ab.dot(ab);
    const eq = this.points[param > 0.5 ? 1 : 0].sub(p);
    const endpointDistance = eq.length();
    if (param > 0 && param < 1) {
      const orthoDistance = ab.getOrthonormal(false).dot(aq);
      if (Math.abs(orthoDistance) < endpointDistance) {
        return [
          new SignedDistance(orthoDistance, 0),
          param,
        ] satisfies DistanceWithParam;
      }
    }

    return [
      new SignedDistance(
        Math.sign(aq.cross(ab)) * endpointDistance,
        Math.abs(ab.normalize().dot(eq.normalize())),
      ),
      param,
    ] satisfies DistanceWithParam;
  }

  direction(_p: number) {
    return this.points[1].sub(this.points[0]);
  }
}
class CubicSegment extends Segment {
  points: [Vector2, Vector2, Vector2, Vector2];
  constructor(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2) {
    super();
    this.points = [p1, p2, p3, p4];
  }

  signedDistance(p: Vector2): [SignedDistance, number] {
    return [new SignedDistance(0, 0), 0];
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
    return this.segment.signedDistance(p);
  }
  color: number;
  distanceToPerpendicularDistance(
    minDistance: SignedDistance,
    p: Vector2,
    nearParam: number,
  ) {}

  direction(p: number) {
    return this.segment.direction(p);
  }
}
// Helper function for multiplying a number with a Range
function multiplyNumberWithRange(factor: number, range: Range): Range {
  return new Range(factor * range.lower, factor * range.upper);
}

// DistanceMapping class
class DistanceMapping {
  private scale: number;
  private translate: number;

  constructor(range: Range) {
    this.scale = 1 / (range.upper - range.lower);
    this.translate = -range.lower;
  }

  map(d: number): number {
    return this.scale * (d + this.translate);
  }

  inverse(): DistanceMapping {
    return new DistanceMapping(1 / this.scale, -this.scale * this.translate);
  }
}

class Range {
  lower: number;
  upper: number;

  constructor(lowerOrSymmetricalWidth: number = 0, upper?: number) {
    if (upper === undefined) {
      this.lower = -0.5 * lowerOrSymmetricalWidth;
      this.upper = 0.5 * lowerOrSymmetricalWidth;
    } else {
      this.lower = lowerOrSymmetricalWidth;
      this.upper = upper;
    }
  }

  multiplyBy(factor: number): Range {
    this.lower *= factor;
    this.upper *= factor;
    return this;
  }

  divideBy(divisor: number): Range {
    this.lower /= divisor;
    this.upper /= divisor;
    return this;
  }

  multiply(factor: number): Range {
    return new Range(this.lower * factor, this.upper * factor);
  }

  divide(divisor: number): Range {
    return new Range(this.lower / divisor, this.upper / divisor);
  }
}
class SignedDistance {
  constructor(
    public distance: number,
    public dot: number,
  ) {}

  lt(d: SignedDistance) {
    return (
      Math.abs(this.distance) < Math.abs(d.distance) ||
      (Math.abs(this.distance) === Math.abs(d.distance) && this.dot < d.dot)
    );
  }
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

  dot(v: Vector2) {
    return this.x * v.x + this.y * v.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getOrthonormal(polarity = true, allowZero = false) {
    const len = this.length();
    if (len) {
      return polarity
        ? new Vector2(-this.y / len, this.x / len)
        : new Vector2(this.y / len, -this.x / len);
    }

    return polarity ? new Vector2(0, allowZero ? 0 : 1) : new Vector2(0, -1);
  }

  cross(v: Vector2) {
    return this.x * v.y - this.y * v.x;
  }

  normalize() {
    const len = this.length();
    return new Vector2(this.x / len, this.y / len);
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
        minDistance: new SignedDistance(Infinity, Infinity),
        nearEdge: null,
        nearParam: 0,
      };
      const g: Colored = {
        minDistance: new SignedDistance(Infinity, Infinity),
        nearEdge: null,
        nearParam: 0,
      };
      const b: Colored = {
        minDistance: new SignedDistance(Infinity, Infinity),
        nearEdge: null,
        nearParam: 0,
      };

      for (const contour of shape.contours) {
        for (const edge of contour.edges) {
          const [distance, param] = edge.signedDistance(p);
          if (edge.color & RED && distance.lt(r.minDistance)) {
            r.minDistance = distance;
            r.nearEdge = edge;
            r.nearParam = param;
          }
          if (edge.color & GREEN && distance.lt(g.minDistance)) {
            g.minDistance = distance;
            g.nearEdge = edge;
            g.nearParam = param;
          }
          if (edge.color & BLUE && distance.lt(b.minDistance)) {
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
      output.data[x + row * output.width] = distanceMapping.map(
        r.minDistance.distance,
      );
      output.data[x + row * output.width + 1] = distanceMapping.map(
        g.minDistance.distance,
      );
      output.data[x + row * output.width + 2] = distanceMapping.map(
        b.minDistance.distance,
      );
    }
  }
}

function edgeColoringSimple(shape: Shape, crossThreshold: number) {
  let color = CYAN;
  const corners: number[] = [];

  shape.contours.forEach((contour) => {
    if (!contour.edges.length) {
      return;
    }

    corners.length = 0;
    let prevDirection = contour.edges[contour.edges.length - 1].direction(1);

    contour.edges.forEach((edge, index) => {
      if (
        isCorner(
          prevDirection.normalize(),
          edge.direction(0).normalize(),
          crossThreshold,
        )
      )
        corners.push(index);
      prevDirection = edge.direction(1);
    });

    if (!corners.length) {
      contour.edges.forEach((edge) => {
        edge.color = color;
      });
    } else if (corners.length === 1) {
      // TODO: Teardrop case
      throw new Error("Teardrop case not implemented");
    } else {
      const cornerCount = corners.length;
      let spline = 0;
      let start = corners[0];
      const m = contour.edges.length;
      color = switchColor(color);
      const initialColor = color;
      for (let i = 0; i < m; i++) {
        const index = (start + i) % m;
        if (spline + 1 < cornerCount && corners[spline + 1] === index) {
          spline++;
          color = switchColor(
            color,
            (spline === cornerCount - 1 ? 1 : 0) * initialColor,
          );
        }
        contour.edges[index].color = color;
      }
    }
  });
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
  edgeColoringSimple(shape, 0);
  // generatePSDF(shape);
  const bitmap = new Bitmap(64, 64);
  const range = new Range(0, 100);
  const scale = new Vector2(1, 1);
  const translate = new Vector2(0, 0);
  generateMSDF(bitmap, shape, range, scale, translate, {});
}
export function isCorner(
  aDir: Vector2,
  bDir: Vector2,
  crossThreshold: number,
): boolean {
  return aDir.dot(bDir) <= 0 || Math.abs(aDir.cross(bDir)) > crossThreshold;
}

function switchColor(color: number, banned?: number) {
  if (banned) {
    const combined = color & banned;
    if (combined == RED || combined == GREEN || combined == BLUE)
      return combined ^ WHITE;
    else {
      return switchColor(color);
    }
  } else {
    const shifted = color << 1;
    return (shifted | (shifted >> 3)) & WHITE;
  }
}
