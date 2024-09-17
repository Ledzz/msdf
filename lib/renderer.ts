import { MaxRectsPacker } from "maxrects-packer";
import { Font, parse } from "opentype.js";
import { FontInfo, ModuleType, Options, PackerRectangle } from "./types";
import { placeOnImageData } from "./placeOnImageData";

const defaultOptions = {
  width: 512,
  height: 512,
  fontSize: 42,
} satisfies Partial<Options>;

export class Renderer {
  width: number;
  height: number;
  fontSize: number;
  packer: MaxRectsPacker<PackerRectangle>;
  parsedFonts?: Font[];
  myFonts?: any[];
  urls?: string[];

  imageData?: ImageData;

  options: Options;
  fontDataCallback?: (data: FontInfo) => void;
  imageDataCallback?: (data: ImageData) => void;
  // TODO: update it on the fly
  fontData: FontInfo = {
    chars: [],
    info: {
      face: "Inter-Bold",
      size: 42,
      bold: 0,
      italic: 0,
      charset: [],
      unicode: 1,
      stretchH: 100,
      smooth: 1,
      aa: 1,
      padding: [2, 2, 2, 2],
      outline: 0,
    },
    common: {
      lineHeight: 51,
      base: 43,
      scaleW: 512,
      scaleH: 512,
      pages: 1,
      packed: 0,
      alphaChnl: 0,
      redChnl: 0,
      greenChnl: 0,
      blueChnl: 0,
    },
    distanceField: { fieldType: "msdf", distanceRange: 4 },
    kernings: [],
  };

  constructor(
    private module: ModuleType,
    options?: Partial<Options>,
  ) {
    const optionsWithDefault = {
      ...defaultOptions,
      ...options,
    };

    this.options = optionsWithDefault as Options;

    this.width = optionsWithDefault.width;
    this.height = optionsWithDefault.height;
    this.fontSize = optionsWithDefault.fontSize;
    this.imageData =
      this.options.imageData ?? new ImageData(this.width, this.height);

    this.packer = new MaxRectsPacker<PackerRectangle>(
      this.width,
      this.height,
      1,
      {},
    );
  }

  setFonts(urls: string[]) {
    this.urls = urls;
  }

  async loadFont(url: string) {
    const fontDataArrayBuffer = await (await fetch(url)).arrayBuffer();

    const fontPtr = this.module._malloc(fontDataArrayBuffer.byteLength);
    this.module.HEAPU8.set(new Uint8Array(fontDataArrayBuffer), fontPtr);

    const f = new this.module.MyFont(fontPtr, fontDataArrayBuffer.byteLength);

    this.myFonts = [f];

    this.parsedFonts = [parse(fontDataArrayBuffer)];

    this.module._free(fontPtr);
  }

  async addGlyphs(glyphs: string) {
    if (!this.urls) {
      throw new Error("Font not specified");
    }
    // TODO: Find font with correct charset
    if (!this.parsedFonts?.[0]) {
      await this.loadFont(this.urls[0]);
    }
    if (!this.parsedFonts) {
      throw new Error("Unknown error");
    }
    const font = this.myFonts[0];

    const rectangles = glyphs
      .split("")
      .map((g) => {
        if (this.packer.rects.some((r) => r.char === g)) {
          return;
        }

        const { width, height, xoffset, yoffset, xadvance } =
          font.getCharMetrics(g.charCodeAt(0), 42);
        console.log({ g, width, height });
        const arrayLength = width * height * 3;

        const floatArray = new Float32Array(arrayLength);
        const dataPtr = this.module._malloc(
          floatArray.length * floatArray.BYTES_PER_ELEMENT,
        );
        this.module.HEAPF32.set(floatArray, dataPtr >> 2);
        font.renderGlyph(g.charCodeAt(0), dataPtr);
        const resultTmp = this.module.HEAPF32.subarray(
          dataPtr >> 2,
          (dataPtr >> 2) + arrayLength,
        ) as Float32Array;

        const result = resultTmp.slice();
        this.module._free(dataPtr);

        const char = {
          id: g.charCodeAt(0),
          index: 0, //glyph.index,
          char: g,
          xoffset: xoffset, //Math.round(bBox.x1) - pad,
          yoffset: yoffset, //Math.round(bBox.y1) + pad + baseline,
          xadvance: xadvance, //(glyph.advanceWidth ?? 0) * scale,
          chnl: 15,
          x: 0,
          y: 0,
          page: 0,
        };

        return {
          width,
          height,
          result,
          ...char,
        };
      })
      .filter(Boolean);

    if (!rectangles.length) {
      return;
    }
    // scaleW, scaleH, lineHeight
    this.fontData.common.scaleW = this.width;
    this.fontData.common.scaleH = this.height;
    this.fontData.common.lineHeight = 51;
    this.packer.addArray(rectangles as any);

    if (this.packer.bins.length > 1) {
      throw new Error("More that one bin");
    }

    this.packer.bins.forEach((bin) => {
      bin.rects.forEach(({ result, width, height, x, y, ...char }) => {
        if (!this.imageData) {
          return;
        }

        this.fontData.info.charset.push(char.char);
        this.fontData.chars.push({ ...char, width, height, x, y });
        placeOnImageData(result, width, height, this.imageData, -x, -y);
      });
    });

    this.fontDataCallback?.(this.fontData);
    if (this.imageData) {
      this.imageDataCallback?.(this.imageData);
    }
  }
}
