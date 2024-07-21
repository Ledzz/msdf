/*
void edgeColoringSimple(Shape &shape, double angleThreshold, unsigned long long seed) {
    double crossThreshold = sin(angleThreshold);
    EdgeColor color = initColor(seed);
    std::vector<int> corners;
    for (std::vector<Contour>::iterator contour = shape.contours.begin(); contour != shape.contours.end(); ++contour) {
        if (contour->edges.empty())
            continue;
        { // Identify corners
            corners.clear();
            Vector2 prevDirection = contour->edges.back()->direction(1);
            int index = 0;
            for (std::vector<EdgeHolder>::const_iterator edge = contour->edges.begin(); edge != contour->edges.end(); ++edge, ++index) {
            if (isCorner(prevDirection.normalize(), (*edge)->direction(0).normalize(), crossThreshold))
            corners.push_back(index);
            prevDirection = (*edge)->direction(1);
        }
        }

        // Smooth contour
        if (corners.empty()) {
            switchColor(color, seed);
            for (std::vector<EdgeHolder>::iterator edge = contour->edges.begin(); edge != contour->edges.end(); ++edge)
            (*edge)->color = color;
        }
        // "Teardrop" case
        else if (corners.size() == 1) {
            EdgeColor colors[3];
            switchColor(color, seed);
            colors[0] = color;
            colors[1] = WHITE;
            switchColor(color, seed);
            colors[2] = color;
            int corner = corners[0];
            if (contour->edges.size() >= 3) {
                int m = (int) contour->edges.size();
                for (int i = 0; i < m; ++i)
                contour->edges[(corner+i)%m]->color = colors[1+symmetricalTrichotomy(i, m)];
            } else if (contour->edges.size() >= 1) {
                // Less than three edge segments for three colors => edges must be split
                EdgeSegment *parts[7] = { };
                contour->edges[0]->splitInThirds(parts[0+3*corner], parts[1+3*corner], parts[2+3*corner]);
                if (contour->edges.size() >= 2) {
                    contour->edges[1]->splitInThirds(parts[3-3*corner], parts[4-3*corner], parts[5-3*corner]);
                    parts[0]->color = parts[1]->color = colors[0];
                    parts[2]->color = parts[3]->color = colors[1];
                    parts[4]->color = parts[5]->color = colors[2];
                } else {
                    parts[0]->color = colors[0];
                    parts[1]->color = colors[1];
                    parts[2]->color = colors[2];
                }
                contour->edges.clear();
                for (int i = 0; parts[i]; ++i)
                contour->edges.push_back(EdgeHolder(parts[i]));
            }
        }
        // Multiple corners
        else {
            int cornerCount = (int) corners.size();
            int spline = 0;
            int start = corners[0];
            int m = (int) contour->edges.size();
            switchColor(color, seed);
            EdgeColor initialColor = color;
            for (int i = 0; i < m; ++i) {
                int index = (start+i)%m;
                if (spline+1 < cornerCount && corners[spline+1] == index) {
                    ++spline;
                    switchColor(color, seed, EdgeColor((spline == cornerCount-1)*initialColor));
                }
                contour->edges[index]->color = color;
            }
        }
    }
}
*/
import { Shape } from "./Shape.ts";
import { isCorner } from "./isCorner.ts";
import { Pointer } from "./pointer.ts";
import { EdgeSegment } from "./Segment.ts";
import { EdgeHolder } from "./EdgeHolder.ts";

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
function seedExtract2(seed: { value: number }): number {
  const v = seed.value & 1;
  seed.value >>= 1;
  return v;
}

function seedExtract3(seed: { value: number }): number {
  const v = seed.value % 3;
  seed.value = Math.floor(seed.value / 3);
  return v;
}

function switchColor(
  color: Pointer<EdgeColor>,
  seed: Pointer<number>,
  banned?: EdgeColor,
): void {
  if (banned) {
    const combined = color.value & banned;
    if (
      combined === EdgeColor.RED ||
      combined === EdgeColor.GREEN ||
      combined === EdgeColor.BLUE
    ) {
      color.value = combined ^ EdgeColor.WHITE;
    } else {
      switchColor(color, seed);
    }
  } else {
    const shifted = color.value << (1 + seedExtract2(seed));
    color.value = (shifted | (shifted >> 3)) & EdgeColor.WHITE;
  }
}

function initColor(seed: { value: number }): Pointer<EdgeColor> {
  const colors: EdgeColor[] = [
    EdgeColor.CYAN,
    EdgeColor.MAGENTA,
    EdgeColor.YELLOW,
  ];
  return { value: colors[seedExtract3(seed)] };
}
function symmetricalTrichotomy(position: number, n: number): number {
  return Math.floor(3 + (2.875 * position) / (n - 1) - 1.4375 + 0.5) - 3;
}
export function edgeColoringSimple(
  shape: Shape,
  angleThreshold: number,
  seed: Pointer<number> = { value: 0 },
) {
  const crossThreshold = Math.sin(angleThreshold);
  const color = initColor(seed);
  const corners: number[] = [];
  for (const contour of shape.contours) {
    if (contour.edges.length === 0) continue;
    // Identify corners
    corners.length = 0;
    let prevDirection =
      contour.edges[contour.edges.length - 1].segment.direction(1);
    let index = 0;
    for (const edge of contour.edges) {
      if (
        isCorner(
          prevDirection.normalize(),
          edge.segment.direction(0).normalize(),
          crossThreshold,
        )
      ) {
        corners.push(index);
      }
      prevDirection = edge.segment.direction(1);
      index++;
    }

    // Smooth contour
    if (corners.length === 0) {
      switchColor(color, seed);
      for (const edge of contour.edges) {
        edge.segment.color = color.value;
      }
    }
    // "Teardrop" case
    else if (corners.length === 1) {
      const colors: EdgeColor[] = [];
      switchColor(color, seed);
      colors[0] = color.value;
      colors[1] = EdgeColor.WHITE;
      switchColor(color, seed);
      colors[2] = color.value;
      const corner = corners[0];

      if (contour.edges.length >= 3) {
        const m = contour.edges.length;
        for (let i = 0; i < m; ++i) {
          const edgeIndex = (corner + i) % m;
          contour.edges[edgeIndex].segment.color =
            colors[1 + symmetricalTrichotomy(i, m)];
        }
      } else if (contour.edges.length >= 1) {
        // Less than three edge segments for three colors => edges must be split
        const parts: (EdgeSegment | null)[] = Array(7).fill(null);
        const [p0, p1, p2] = contour.edges[0].segment.splitInThirds();

        parts[0 + 3 * corner] = p0;
        parts[1 + 3 * corner] = p1;
        parts[2 + 3 * corner] = p2;

        if (contour.edges.length >= 2) {
          const [p0, p1, p2] = contour.edges[1].segment.splitInThirds();

          parts[3 - 3 * corner] = p0;
          parts[4 - 3 * corner] = p1;
          parts[5 - 3 * corner] = p2;
          parts[0]!.color = parts[1]!.color = colors[0];
          parts[2]!.color = parts[3]!.color = colors[1];
          parts[4]!.color = parts[5]!.color = colors[2];
        } else {
          parts[0]!.color = colors[0];
          parts[1]!.color = colors[1];
          parts[2]!.color = colors[2];
        }

        contour.edges = [];
        for (const part of parts) {
          if (part) {
            contour.edges.push(new EdgeHolder(part));
          }
        }
      }
    }
    // Multiple corners
    else {
      const cornerCount = corners.length;
      let spline = 0;
      const start = corners[0];
      const m = contour.edges.length;
      switchColor(color, seed);
      const initialColor = color;
      for (let i = 0; i < m; ++i) {
        const index = (start + i) % m;
        if (spline + 1 < cornerCount && corners[spline + 1] == index) {
          ++spline;
          switchColor(color, seed, (spline === cornerCount - 1) * initialColor);
        }
        contour.edges[index].segment.color = color.value;
      }
    }
  }
}
