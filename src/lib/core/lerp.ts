import { Vector2 } from "./Vector2.ts";

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const lerpVector2 = (a: Vector2, b: Vector2, t: number) =>
  new Vector2(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
