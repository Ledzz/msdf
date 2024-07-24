import * as typr from "@fredli74/typr";
import { Path } from "@fredli74/typr";

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

  const shape = shapeFromPath(path);
  edgeColoringSimple(shape, 0);
  // generatePSDF(shape);
  generateMSDF(shape);
}

type Vector2 = [number, number];

type LineSegment = {
  type: "line";
  points: [Vector2, Vector2];
};

type CubicSegment = {
  type: "cubic";
  points: [Vector2, Vector2, Vector2, Vector2];
};

type Segment = LineSegment | CubicSegment;

type Edge = {
  color?: EdgeColor;
  segment: Segment;
};

type Contour = {
  edges: Edge[];
};

type Shape = {
  contours: Contour[];
};

function clone(v: Vector2): Vector2 {
  return [v[0], v[1]];
}

function shapeFromPath(path: Path): Shape {
  let crdsi = 0;
  let contour: Contour = {
    edges: [],
  };
  let point: Vector2 | undefined;
  let firstPoint: Vector2 | undefined;

  const shape: Shape = {
    contours: [],
  };

  path.cmds.forEach((cmd) => {
    switch (cmd) {
      case "M":
        point = [path.crds[crdsi++], path.crds[crdsi++]] satisfies Vector2;
        firstPoint = clone(point);
        break;

      case "L": {
        if (!point) {
          throw new Error("No prev point for line");
        }

        const line = {
          type: "line",
          points: [point, [path.crds[crdsi++], path.crds[crdsi++]]],
        } satisfies LineSegment;
        contour.edges.push({ segment: line });
        point = clone(line.points[1]);
        break;
      }

      case "Q":
        // TODO: Parse quadratic segment
        throw new Error("Quadratic segment not implemented");

      case "C":
        if (!point) {
          throw new Error("No prev point for cubic");
        }
        const cubic = {
          type: "cubic",
          points: [
            point,
            [path.crds[crdsi++], path.crds[crdsi++]],
            [path.crds[crdsi++], path.crds[crdsi++]],
            [path.crds[crdsi++], path.crds[crdsi++]],
          ],
        } satisfies CubicSegment;
        contour.edges.push({ segment: cubic });
        point = clone(cubic.points[3]);
        break;

      case "Z": {
        if (!point || !firstPoint) {
          throw new Error("No prev point for close");
        }
        const line = {
          type: "line",
          points: [point, firstPoint],
        } satisfies LineSegment;
        contour.edges.push({ segment: line });

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

function debugSDF(
  output: Float32Array,
  sdfw: number,
  sdfh: number,
  channels = 1,
  useMedian = false,
) {
  const ow = 128;
  const oh = 128;

  const grouped =
    channels === 1
      ? Array.from(output).map((d) => [d])
      : Array.from(output).reduce((acc, d) => {
          const prev = acc[acc.length - 1];

          if (!prev) {
            return [[d]];
          }

          if (prev.length < channels) {
            prev.push(d);
            return acc;
          }

          return [...acc, [d]];
        }, [] as number[][]);
  const resized = resize(grouped, sdfw, sdfh, ow, oh);

  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.gridTemplateColumns = `repeat(${ow}, 1fr)`;
  div.style.gridTemplateRows = `repeat(${oh}, 1fr)`;
  div.style.width = "100%";
  div.style.height = "100%";

  const totalSize = 700;

  div.style.cssText = `
  display: grid;
    grid-template-columns: repeat(${ow}, ${totalSize / ow}px);
    grid-template-rows: repeat(${oh}, ${totalSize / oh}px);
    font-size: 7px;
  `;
  document.body.append(div);

  // const sideCount = Math.sqrt(output.length);
  // for (let x = 0; x < sdfw; x++) {
  //   for (let y = 0; y < outputHeight; y++) {
  //     const sampled = bilinearSample(grouped, x / outputWidth, y / outputWidth);
  //   }
  // }

  const sideCount = Math.sqrt(resized.length);

  div.innerHTML = resized
    .map((c, i) => {
      const r = map(channels === 1 ? c[0] : c[0], -1025, 1024, 255, 0);
      const g = map(channels === 1 ? c[0] : c[1], -1025, 1024, 255, 0);
      const b = map(channels === 1 ? c[0] : c[2], -1025, 1024, 255, 0);
      // const v = median(r, g, b) > 128 ? 1024 : -1024;
      const v = median(r, g, b);
      const rv = useMedian ? v : r;
      const gv = useMedian ? v : g;
      const bv = useMedian ? v : b;

      return `<span style="background-color: rgb(${rv}, ${gv}, ${bv}); display: flex;align-items: center;justify-content: center" data-x="${i % sideCount}"  data-y="${Math.floor(i / sideCount)}">${sideCount < 64 ? c.map((i) => i.toFixed(0)) : ""}</span>`;
    })
    .join("");
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpArray(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => lerp(v, b[i], t));
}

function median(...values: number[]) {
  return values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
}

function generatePSDF(shape: Shape) {
  const w = 16;
  const h = 16;

  const sw = 2048;
  const sh = 2048;

  const output = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = ((x + 0.5) * sw) / w;
      const py = ((y + 0.5) * sh) / h;
      let minDistance = Infinity;
      let maxOrtho = 0;
      let closestEdge: Edge | null = null;
      shape.contours.forEach((contour) => {
        contour.edges.forEach((edge) => {
          const [d, ortho] = distanceToSegment(edge.segment, [px, py], false);
          if (
            Math.abs(d) < Math.abs(minDistance) ||
            (Math.abs(d) === Math.abs(minDistance) && ortho > maxOrtho)
          ) {
            minDistance = d;
            maxOrtho = ortho;
            closestEdge = edge;
          }
        });
      });

      if (closestEdge) {
        const [d] = distanceToSegment(closestEdge.segment, [px, py], true);

        const i = y * w + x;
        // для SDF просто подставляем minDistance

        output[i] = d;
      }
    }
  }

  debugSDF(output, w, h);
}

function resize(
  input: number[][],
  iw: number,
  ih: number,
  ow: number,
  oh: number,
  channels = 1,
) {
  const output: number[][] = [];

  for (let y = 0; y < oh; y++) {
    for (let x = 0; x < ow; x++) {
      const px = (x + 0.5) / ow;
      const py = (y + 0.5) / oh;

      const x0 = clamp(Math.floor(px * iw), 0, iw - 1);
      const y0 = clamp(Math.floor(py * ih), 0, ih - 1);
      const x1 = clamp(Math.ceil(px * iw), 0, iw - 1);
      const y1 = clamp(Math.ceil(py * ih), 0, ih - 1);

      const v00 = input[y0 * iw + x0];
      const v01 = input[y1 * iw + x0];
      const v10 = input[y0 * iw + x1];
      const v11 = input[y1 * iw + x1];

      const xFrac = px * iw - x0;
      const yFrac = py * ih - y0;

      const v0 = lerpArray(v00, v01, yFrac);
      const v1 = lerpArray(v10, v11, yFrac);
      let o = lerpArray(v0, v1, xFrac);

      output[(y * ow + x) * channels] = o;
    }
  }

  return output;
}

function generateMSDF(shape: Shape) {
  const w = 8;
  const h = 8;
  const sw = 2048;
  const sh = 2048;

  const output = new Float32Array(w * h * 3);

  for (let y = 0; y < h; y++) {
    const row = y; // shape.contours.length - 1 - y;
    for (let x = 0; x < w; x++) {
      const px = ((x + 0.5) * sw) / w;
      const py = ((y + 0.5) * sh) / h;

      const r = {
        minDistance: Infinity,
        nearEdge: null as Edge | null,
        nearParam: 0,
        maxOrtho: 0,
      };
      const g = {
        minDistance: Infinity,
        nearEdge: null as Edge | null,
        nearParam: 0,
        maxOrtho: 0,
      };
      const b = {
        minDistance: Infinity,
        nearEdge: null as Edge | null,
        nearParam: 0,
        maxOrtho: 0,
      };

      shape.contours.forEach((contour) => {
        contour.edges.forEach((edge) => {
          if (!edge.color) {
            throw new Error("Edge color not set");
          }
          const [d, ortho] = distanceToSegment(edge.segment, [px, py], false);

          if (
            edge.color & EdgeColor.RED &&
            (Math.abs(d) < Math.abs(r.minDistance) ||
              (Math.abs(d) === Math.abs(r.minDistance) && ortho > r.maxOrtho))
          ) {
            r.minDistance = d;
            r.maxOrtho = ortho;
            r.nearEdge = edge;
          }
          if (
            edge.color & EdgeColor.GREEN &&
            (Math.abs(d) < Math.abs(g.minDistance) ||
              (Math.abs(d) === Math.abs(g.minDistance) && ortho > g.maxOrtho))
          ) {
            g.minDistance = d;
            g.maxOrtho = ortho;
            g.nearEdge = edge;
          }
          if (
            edge.color & EdgeColor.BLUE &&
            (Math.abs(d) < Math.abs(b.minDistance) ||
              (Math.abs(d) === Math.abs(b.minDistance) && ortho > b.maxOrtho))
          ) {
            b.minDistance = d;
            b.maxOrtho = ortho;
            b.nearEdge = edge;
          }
        });
      });
      const i = (row * w + x) * 3;

      if (r.nearEdge) {
        const [d] = distanceToSegment(r.nearEdge.segment, [px, py], true);
        output[i] = d;
      }
      if (g.nearEdge) {
        const [d] = distanceToSegment(g.nearEdge.segment, [px, py], true);
        output[i + 1] = d;
      }
      if (b.nearEdge) {
        const [d] = distanceToSegment(b.nearEdge.segment, [px, py], true);
        output[i + 2] = d;
      }
    }
  }
  debugSDF(output, w, h, 3);
}

function distanceToSegment(
  segment: Segment,
  point: Vector2,
  pseudo: boolean,
): [number, number, Vector2] {
  if (segment.type === "line") {
    return distanceToLine(segment, point, pseudo);
  } else {
    return distanceToCubic(segment, point, pseudo);
  }
}
function distanceToCubic(
  segment: CubicSegment,
  point: Vector2,
  pseudo: boolean,
): ReturnType<typeof distanceToSegment> {
  // TODO: Calculate distance to cubic segment
  throw new Error("distanceToCubic not implemented");
}
function clamp(param: number, a: number, b: number) {
  return Math.min(Math.max(param, a), b);
}

function distanceToLine(
  segment: LineSegment,
  point: Vector2,
  pseudo: boolean,
): ReturnType<typeof distanceToSegment> {
  const [a, b] = segment.points;
  const aq = sub(point, a);
  const ab = sub(b, a);
  const param = dot(aq, ab) / dot(ab, ab);

  const p = sum(a, mul(ab, param));
  const d = sub(p, point);
  const distance = length(d);

  const sign = dot(orthonormal(ab, false), d) < 0 ? -1 : 1;

  const eq = sub(param > 0.5 ? b : a, point);
  const wtf = Math.abs(cross(normalize(ab), normalize(eq)));

  if (pseudo || (param >= 0 && param <= 1)) {
    return [sign * distance, wtf, p];
  }

  if (param < 0) {
    return [sign * length(sub(point, a)), wtf, a];
  }
  if (param > 1) {
    return [sign * length(sub(point, b)), wtf, b];
  }

  return [Infinity, 0, [0, 0]];
}

function sum(v1: Vector2, v2: Vector2): Vector2 {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

function mul(v: Vector2, s: number): Vector2 {
  return [v[0] * s, v[1] * s];
}

function sub(v1: Vector2, v2: Vector2): Vector2 {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}

function dot(v1: Vector2, v2: Vector2): number {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

function cross(v1: Vector2, v2: Vector2): number {
  return v1[0] * v2[1] - v1[1] * v2[0];
}
function length(v: Vector2): number {
  return Math.hypot(v[0], v[1]);
}

function orthonormal(v: Vector2, sign = true, allowZero = false): Vector2 {
  const len = length(v);
  if (len) {
    return sign ? [-v[1] / len, v[0] / len] : [v[1] / len, -v[0] / len];
  }
  return sign ? [0, allowZero ? 0 : 1] : [0, -1];
}

function normalize(v: Vector2): Vector2 {
  const len = length(v);
  return [v[0] / len, v[1] / len];
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
enum EdgeColor {
  BLACK = 0,
  RED = 1,
  GREEN = 2,
  YELLOW = 3,
  BLUE = 4,
  MAGENTA = 5,
  CYAN = 6,
  WHITE = 7,
}

function getDirectionLine(segment: LineSegment) {
  return sub(segment.points[1], segment.points[0]);
}
function getDirectionCubic(segment: CubicSegment, param: number) {
  // TODO: Calculate direction for cubic segment
  throw new Error("getDirectionCubic not implemented");
}

function getDirection(edge: Edge, param: number) {
  switch (edge.segment.type) {
    case "line":
      return getDirectionLine(edge.segment);
    case "cubic":
      return getDirectionCubic(edge.segment, param);
  }
}

function isCorner(a: Vector2, b: Vector2, threshold: number) {
  return dot(a, b) <= 0 || Math.abs(cross(a, b)) > threshold;
}

function edgeColoringSimple(shape: Shape, crossThreshold: number) {
  let color = EdgeColor.CYAN;
  const corners: number[] = [];

  shape.contours.forEach((contour) => {
    if (!contour.edges.length) {
      return;
    }

    corners.length = 0;
    let prevDirection = getDirection(
      contour.edges[contour.edges.length - 1],
      1,
    );

    contour.edges.forEach((edge, index) => {
      if (
        isCorner(
          normalize(prevDirection),
          normalize(getDirection(edge, 0)),
          crossThreshold,
        )
      )
        corners.push(index);
      prevDirection = getDirection(edge, 1);
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

function switchColor(color: EdgeColor, banned?: EdgeColor) {
  if (banned) {
    const combined = color & (banned as EdgeColor);
    if (
      combined == EdgeColor.RED ||
      combined == EdgeColor.GREEN ||
      combined == EdgeColor.BLUE
    )
      return (combined ^ EdgeColor.WHITE) as EdgeColor;
    else {
      return switchColor(color);
    }
  } else {
    const shifted = color << 1;
    return ((shifted | (shifted >> 3)) & EdgeColor.WHITE) as EdgeColor;
  }
}
