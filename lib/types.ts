import { Rectangle } from "maxrects-packer";

export type PackerRectangle = Rectangle & { result: Float32Array };
export type Options = {
  width: number;
  height: number;
  fontSize: number;
  imageData?: ImageData;
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
export type WorkerAPI = {};

export type FontInfo = {
  pages: Array<string>;
  chars: Array<GlyphInfo>;
  info: {
    face: string;
    size: number;
    bold: number;
    italic: number;
    charset: Array<string>;
    unicode: number;
    stretchH: number;
    smooth: number;
    aa: number;
    padding: [number, number, number, number];
    spacing: [number, number, number, number];
    outline: number;
  };
  common: {
    lineHeight: number;
    base: number;
    scaleW: number;
    scaleH: number;
    pages: number;
    packed: number;
    alphaChnl: number;
    redChnl: number;
    greenChnl: number;
    blueChnl: number;
  };
  distanceField: {
    fieldType: string;
    distanceRange: number;
  };
  kernings: Array<{
    first: number;
    second: number;
    amount: number;
  }>;
};

export type GlyphInfo = {
  id: number;
  index: number;
  char: string;
  width: number;
  height: number;
  x: number;
  y: number;
  xoffset: number;
  yoffset: number;
  xadvance: number;
  chnl: number;
  page: number;
};
