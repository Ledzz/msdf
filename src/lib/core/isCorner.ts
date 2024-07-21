import { Vector2 } from "./Vector2.ts";

export function isCorner(
  aDir: Vector2,
  bDir: Vector2,
  crossThreshold: number,
): boolean {
  return (
    Vector2.dotProduct(aDir, bDir) <= 0 ||
    Math.abs(Vector2.crossProduct(aDir, bDir)) > crossThreshold
  );
}
