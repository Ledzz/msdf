import { Rectangle } from "maxrects-packer";

export type PackerRectangle = Rectangle & { result: Float32Array };
export type Options = {
  width: number;
  height: number;
  fontSize: number;

  mode:
    | "OffscreenCanvas"
    | "Uint8ClampedArray"
    | "SharedArrayBuffer"
    | "ImageData";
};
// TODO: it should be loaded from wasm
export type ModuleType = {
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  HEAPF32: Float32Array;
  VectorDouble: any;
  VectorInt: any;
  generateMSDF: (
    dataPtr: number,
    crds: any,
    cmds: any,
    width: number,
    height: number,
    distanceRange: number,
    scale: number,
    xOffset: number,
    yOffset: number,
    channels: number,
  ) => void;
};
