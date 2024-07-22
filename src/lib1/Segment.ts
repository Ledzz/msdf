import { Vector2 } from "./Vector2.ts";
import { EdgeColor } from "./edgeColoring.ts";
import { nonZeroSign } from "../lib/core/nonZeroSign.ts";
import { lerpVector2 } from "../lib/core/lerp.ts";

export abstract class EdgeSegment {
  color: EdgeColor;

  abstract signedDistance(point: Vector2);

  abstract pseudoDistance(point: Vector2);
}

export class LineSegment extends EdgeSegment {
  points: [Vector2, Vector2];

  signedDistance(point: Vector2): number {
    const aq = new Vector2(
      point.x - this.points[0].x,
      point.y - this.points[0].y,
    );
    const ab = new Vector2(
      this.points[1].x - this.points[0].x,
      this.points[1].y - this.points[0].y,
    );

    const param = Vector2.dotProduct(aq, ab) / Vector2.dotProduct(ab, ab);
    const eq = new Vector2(
      this.points[param > 0.5 ? 1 : 0].x - point.x,
      this.points[param > 0.5 ? 1 : 0].y - point.y,
    );
    const endpointDistance = eq.length();

    if (param > 0 && param < 1) {
      const orthoDistance = Vector2.dotProduct(ab.getOrthonormal(false), aq);
      if (Math.abs(orthoDistance) < endpointDistance) return orthoDistance;
    }

    return nonZeroSign(Vector2.crossProduct(aq, ab)) * endpointDistance;
  }

  pseudoDistance(point: Vector2): number {
    // TODO
    return this.signedDistance(point);
  }
}

const MSDFGEN_CUBIC_SEARCH_STARTS = 4;
const MSDFGEN_CUBIC_SEARCH_STEPS = 4;

export class QuadraticSegment extends EdgeSegment {
  points: [Vector2, Vector2, Vector2];

  signedDistance(point: Vector2): number {
    // TODO
    return Math.random();
  }

  pseudoDistance(point: Vector2): number {
    // TODO
    return this.signedDistance(point);
  }
}

export class CubicSegment extends EdgeSegment {
  points: [Vector2, Vector2, Vector2, Vector2];

  signedDistance(point: Vector2): number {
    const qa = Vector2.sub(this.points[0], point);
    const ab = Vector2.sub(this.points[1], this.points[0]);
    const br = Vector2.sub(Vector2.sub(this.points[2], this.points[1]), ab);
    const as = Vector2.sub(
      Vector2.sub(
        Vector2.sub(this.points[3], this.points[2]),
        Vector2.sub(this.points[2], this.points[1]),
      ),
      br,
    );

    let epDir = this.direction(0);
    let minDistance =
      nonZeroSign(Vector2.crossProduct(epDir, qa)) * qa.length();
    let param =
      -Vector2.dotProduct(qa, epDir) / Vector2.dotProduct(epDir, epDir);

    // epDir = direction(1);
    // double distance = (p[3]-origin).length(); // distance from B
    // if (distance < fabs(minDistance)) {
    //   minDistance = nonZeroSign(crossProduct(epDir, p[3]-origin))*distance;
    //   param = dotProduct(epDir-(p[3]-origin), epDir)/dotProduct(epDir, epDir);
    // }
    epDir = this.direction(1);
    const distance = Vector2.sub(this.points[3], point).length();
    if (distance < Math.abs(minDistance)) {
      minDistance =
        nonZeroSign(
          Vector2.crossProduct(epDir, Vector2.sub(this.points[3], point)),
        ) * distance;
      param =
        Vector2.dotProduct(
          Vector2.sub(epDir, Vector2.sub(this.points[3], point)),
          epDir,
        ) / Vector2.dotProduct(epDir, epDir);
    }

    // Iterative minimum distance search
    // for (int i = 0; i <= MSDFGEN_CUBIC_SEARCH_STARTS; ++i) {
    //   double t = (double) i/MSDFGEN_CUBIC_SEARCH_STARTS;
    //   Vector2 qe = qa+3*t*ab+3*t*t*br+t*t*t*as;
    //   for (int step = 0; step < MSDFGEN_CUBIC_SEARCH_STEPS; ++step) {
    //     // Improve t
    //     Vector2 d1 = 3*ab+6*t*br+3*t*t*as;
    //     Vector2 d2 = 6*br+6*t*as;
    //     t -= dotProduct(qe, d1)/(dotProduct(d1, d1)+dotProduct(qe, d2));
    //     if (t <= 0 || t >= 1)
    //       break;
    //     qe = qa+3*t*ab+3*t*t*br+t*t*t*as;
    //     double distance = qe.length();
    //     if (distance < fabs(minDistance)) {
    //       minDistance = nonZeroSign(crossProduct(d1, qe))*distance;
    //       param = t;
    //     }
    //   }
    // }
    //
    // if (param >= 0 && param <= 1)
    //   return SignedDistance(minDistance, 0);
    // if (param < .5)
    //   return SignedDistance(minDistance, fabs(dotProduct(direction(0).normalize(), qa.normalize())));
    // else
    //   return SignedDistance(minDistance, fabs(dotProduct(direction(1).normalize(), (p[3]-origin).normalize())));
    for (let i = 0; i <= MSDFGEN_CUBIC_SEARCH_STARTS; ++i) {
      let t = i / MSDFGEN_CUBIC_SEARCH_STARTS;
      let qe = Vector2.add(
        qa,
        Vector2.add(
          Vector2.mul(ab, 3 * t),
          Vector2.add(Vector2.mul(br, 3 * t * t), Vector2.mul(as, t * t * t)),
        ),
      );
      for (let step = 0; step < MSDFGEN_CUBIC_SEARCH_STEPS; ++step) {
        const d1 = Vector2.add(
          Vector2.mul(ab, 3),
          Vector2.add(Vector2.mul(br, 6 * t), Vector2.mul(as, 3 * t * t)),
        );
        const d2 = Vector2.add(Vector2.mul(br, 6), Vector2.mul(as, 6 * t));
        t -=
          Vector2.dotProduct(qe, d1) /
          (Vector2.dotProduct(d1, d1) + Vector2.dotProduct(qe, d2));
        if (t <= 0 || t >= 1) break;
        qe = Vector2.add(
          qa,
          Vector2.add(
            Vector2.mul(ab, 3 * t),
            Vector2.add(Vector2.mul(br, 3 * t * t), Vector2.mul(as, t * t * t)),
          ),
        );
        const distance = qe.length();
        if (distance < Math.abs(minDistance)) {
          minDistance = nonZeroSign(Vector2.crossProduct(d1, qe)) * distance;
          param = t;
        }
      }
    }

    // console.log("cubic signedDistance", minDistance);
    // if (param >= 0 && param <= 1)
    //   return SignedDistance(minDistance, 0);
    // if (param < .5)
    //   return SignedDistance(minDistance, fabs(dotProduct(direction(0).normalize(), qa.normalize())));
    // else
    //   return SignedDistance(minDistance, fabs(dotProduct(direction(1).normalize(), (p[3]-origin).normalize())));

    return minDistance;
  }

  pseudoDistance(point: Vector2): number {
    // TODO
    return this.signedDistance(point);
  }

  direction(param: number) {
    const tangent = lerpVector2(
      lerpVector2(
        Vector2.sub(this.points[1], this.points[0]),
        Vector2.sub(this.points[2], this.points[1]),
        param,
      ),
      lerpVector2(
        Vector2.sub(this.points[2], this.points[1]),
        Vector2.sub(this.points[3], this.points[2]),
        param,
      ),
      param,
    );

    if (!tangent.length()) {
      if (param == 0) return Vector2.sub(this.points[2], this.points[0]);
      if (param == 1) return Vector2.sub(this.points[3], this.points[1]);
    }
    return tangent;
  }
}
