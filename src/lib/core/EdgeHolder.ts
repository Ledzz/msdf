import { EdgeSegment } from "./Segment.ts";

export class EdgeHolder {
  segment: EdgeSegment;

  constructor(segment: EdgeSegment) {
    this.segment = segment;
  }
}
