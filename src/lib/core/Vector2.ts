export class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static dotProduct(a: Vector2, b: Vector2) {
    return a.x * b.x + a.y * b.y;
  }

  static crossProduct(a: Vector2, b: Vector2) {
    return a.x * b.y - a.y * b.x;
  }

  static lerp(a: Vector2, b: Vector2, t: number) {
    return new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  }

  static sub(a: Vector2, b: Vector2) {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getOrthonormal(polarity = true, allowZero = false) {
    const len = this.length();
    if (len)
      return polarity
        ? new Vector2(-this.y / len, this.x / len)
        : new Vector2(this.y / len, -this.x / len);
    return polarity
      ? new Vector2(0, allowZero ? 0 : 1)
      : new Vector2(0, -!allowZero);
  }

  normalize() {
    const len = this.length();
    return new Vector2(this.x / len, this.y / len);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
}
