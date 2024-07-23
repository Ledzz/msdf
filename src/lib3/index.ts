import * as typr from "@fredli74/typr";
import { Path } from "@fredli74/typr";

export function library(data: ArrayBuffer) {
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("A")[0];
  const path = font.glyphToPath(glyph);
  // TODO: 4.1.3.1 Edge pruning

  // const shape = Shape.fromPath(path);
  // console.log(shape);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);

  const shape = shapeFromPath(path);
  // delete shape.contours[0];

  // console.log(path, shape);
  generatePSDF(shape);
  // generateSDF(shape);

  const a = {
    contours: [
      {
        edges: [
          {
            segment: {
              type: "line",
              points: [
                [531, 0],
                [683, 467],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [683, 467],
                [1422, 467],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1422, 467],
                [1574, 0],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1574, 0],
                [2038, 0],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [2038, 0],
                [1332, 2048],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1332, 2048],
                [774, 2048],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [774, 2048],
                [67, 0],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [67, 0],
                [531, 0],
              ],
            },
          },
        ],
      },
      {
        edges: [
          {
            segment: {
              type: "line",
              points: [
                [793, 805],
                [1045, 1580],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1045, 1580],
                [1061, 1580],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1061, 1580],
                [1313, 805],
              ],
            },
          },
          {
            segment: {
              type: "line",
              points: [
                [1313, 805],
                [531, 0],
              ],
            },
          },
        ],
      },
    ],
  };

  // const output = new Bitmap(10, 10);
  // const transform = new SDFTransform();
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

function debugPSDF(output: Float32Array, w: number, h: number) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
  div.style.gridTemplateRows = `repeat(${h}, 1fr)`;
  div.style.width = "100%";
  div.style.height = "100%";

  const totalSize = 700;

  div.style.cssText = `
  display: grid;
    grid-template-columns: repeat(${w}, ${totalSize / w}px);
    grid-template-rows: repeat(${h}, ${totalSize / h}px);
    font-size: 7px;
  `;
  document.body.append(div);
  div.innerHTML = Array.from(output)
    .map((d, i) => {
      const sideCount = Math.sqrt(output.length);
      return `<span style="background-color: rgba(0, 0, 0, ${map(d, -1024, 1024, 0, 0.8)}); display: flex;align-items: center;justify-content: center" data-x="${i % sideCount}"  data-y="${Math.floor(i / sideCount)}">${sideCount < 64 ? d.toFixed(0) : ""}</span>`;
    })
    .join("");
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

  debugPSDF(output, w, h);
}
/*
function generateSDF(shape: Shape) {
  const w = 256;
  const h = 256;

  const sw = 2048;
  const sh = 2048;

  const output = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = ((x + 0.5) * sw) / w;
      const py = ((y + 0.5) * sh) / h;
      let minDistance = Infinity;
      let maxOrtho = 0;
      shape.contours.forEach((contour, ci) => {
        contour.edges.forEach((edge) => {
          const [d, ortho] = distanceToSegment(edge.segment, [px, py], false);
          if (
            Math.abs(d) < Math.abs(minDistance) ||
            (Math.abs(d) === Math.abs(minDistance) && ortho > maxOrtho)
          ) {
            minDistance = d;
            maxOrtho = ortho;
          }
        });
      });

      const i = y * w + x;
      output[i] = minDistance;
    }
  }

  debugPSDF(output, w, h);
}
*/
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

function distanceToCubic(
  points: [Vector2, Vector2, Vector2, Vector2],
  point: Vector2,
  pseudo: boolean,
): ReturnType<typeof distanceToSegment> {
  // TODO
  return [Infinity, [0, 0]];
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
