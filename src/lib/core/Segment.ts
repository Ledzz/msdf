import { Vector2 } from "./Vector2.ts";
import { SignedDistance } from "./SignedDistance.ts";
import { nonZeroSign } from "./nonZeroSign.ts";
import { lerpVector2 } from "./lerp.ts";
import { EdgeColor } from "./edgeColoring.ts";

export abstract class EdgeSegment {
  abstract signedDistance(p: Vector2): SignedDistance;
  abstract direction(param: number): Vector2;
  abstract splitInThirds(): [EdgeSegment, EdgeSegment, EdgeSegment];
  abstract point(param: number): Vector2;
  color: EdgeColor = EdgeColor.BLACK;
}

export class LineSegment extends EdgeSegment {
  points: [Vector2, Vector2];

  constructor(points: [Vector2, Vector2], color: EdgeColor) {
    super();
    this.points = points;
    this.color = color;
  }

  override signedDistance(p: Vector2) {
    const aq = new Vector2(p.x - this.points[0].x, p.y - this.points[0].y);
    const ab = new Vector2(
      this.points[1].x - this.points[0].x,
      this.points[1].y - this.points[0].y,
    );

    const param = Vector2.dotProduct(aq, ab) / Vector2.dotProduct(ab, ab);
    const eq = new Vector2(
      this.points[param > 0.5 ? 1 : 0].x - p.x,
      this.points[param > 0.5 ? 1 : 0].y - p.y,
    );
    const endpointDistance = eq.length();

    if (param > 0 && param < 1) {
      const orthoDistance = Vector2.dotProduct(ab.getOrthonormal(false), aq);
      if (Math.abs(orthoDistance) < endpointDistance)
        return new SignedDistance(orthoDistance, 0);
    }

    return new SignedDistance(
      nonZeroSign(Vector2.crossProduct(aq, ab)) * endpointDistance,
      Math.abs(Vector2.dotProduct(ab.normalize(), eq.normalize())),
    );
  }

  override direction(param: number) {
    return Vector2.sub(this.points[1], this.points[0]);
  }

  override splitInThirds() {
    const first = lerpVector2(this.points[0], this.points[1], 1 / 3);
    const second = lerpVector2(this.points[0], this.points[1], 2 / 3);
    return [
      new LineSegment([this.points[0], first], this.color),
      new LineSegment([first, second], this.color),
      new LineSegment([second, this.points[1]], this.color),
    ];
  }

  override point(param: number) {
    return lerpVector2(this.points[0], this.points[1], param);
  }
}

export class QuadraticSegment extends EdgeSegment {
  points: [Vector2, Vector2, Vector2];

  override direction(param: number) {
    return new Vector2(0, 0);
  }
}

export class CubicSegment extends EdgeSegment {
  points: [Vector2, Vector2, Vector2, Vector2];

  constructor(points: [Vector2, Vector2, Vector2, Vector2], color: EdgeColor) {
    super();
    this.points = points;
    this.color = color;
  }

  override signedDistance(p: Vector2) {
    return new SignedDistance(Infinity, 0);
  }

  override direction(param: number) {
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

  override point(param: number) {
    const p12 = Vector2.lerp(this.points[1], this.points[2], param);
    return Vector2.lerp(
      Vector2.lerp(
        Vector2.lerp(this.points[0], this.points[1], param),
        p12,
        param,
      ),
      Vector2.lerp(
        p12,
        Vector2.lerp(this.points[2], this.points[3], param),
        param,
      ),
      param,
    );
  }

  override splitInThirds() {
    const part0 = new CubicSegment(
      [
        this.points[0],
        this.points[0] == this.points[1]
          ? this.points[0]
          : Vector2.lerp(this.points[0], this.points[1], 1 / 3),
        Vector2.lerp(
          Vector2.lerp(this.points[0], this.points[1], 1 / 3),
          Vector2.lerp(this.points[1], this.points[2], 1 / 3),
          1 / 3,
        ),
        this.point(1 / 3),
      ],
      this.color,
    );
    const part1 = new CubicSegment(
      [
        this.point(1 / 3),
        Vector2.lerp(
          Vector2.lerp(
            Vector2.lerp(this.points[0], this.points[1], 1 / 3),
            Vector2.lerp(this.points[1], this.points[2], 1 / 3),
            1 / 3,
          ),
          Vector2.lerp(
            Vector2.lerp(this.points[1], this.points[2], 1 / 3),
            Vector2.lerp(this.points[2], this.points[3], 1 / 3),
            1 / 3,
          ),
          2 / 3,
        ),
        Vector2.lerp(
          Vector2.lerp(
            Vector2.lerp(this.points[0], this.points[1], 2 / 3),
            Vector2.lerp(this.points[1], this.points[2], 2 / 3),
            2 / 3,
          ),
          Vector2.lerp(
            Vector2.lerp(this.points[1], this.points[2], 2 / 3),
            Vector2.lerp(this.points[2], this.points[3], 2 / 3),
            2 / 3,
          ),
          1 / 3,
        ),
        this.point(2 / 3),
      ],
      this.color,
    );
    const part2 = new CubicSegment(
      [
        this.point(2 / 3),
        Vector2.lerp(
          Vector2.lerp(this.points[1], this.points[2], 2 / 3),
          Vector2.lerp(this.points[2], this.points[3], 2 / 3),
          2 / 3,
        ),
        this.points[2] == this.points[3]
          ? this.points[3]
          : Vector2.lerp(this.points[2], this.points[3], 2 / 3),
        this.points[3],
      ],
      this.color,
    );

    return [part0, part1, part2];
  }
}
