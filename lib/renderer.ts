import { MaxRectsPacker } from "maxrects-packer";
import { Font, parse } from "opentype.js";
import { FontData, ModuleType, Options, PackerRectangle } from "./types";
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
  urls?: string[];

  imageData?: ImageData;

  options: Options;
  fontDataCallback?: (data: FontData) => void;
  imageDataCallback?: (data: ImageData) => void;
  // TODO: update it on the fly
  fontData: FontData = {
    chars: [],
    info: {
      face: "Inter-Bold",
      size: 42,
      bold: 0,
      italic: 0,
      charset: [
        "’",
        "|",
        "W",
        "j",
        "@",
        "$",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "/",
        "\\",
        "w",
        "%",
        "M",
        "Q",
        "m",
        "0",
        "f",
        "g",
        "i",
        "p",
        "q",
        "y",
        "!",
        "#",
        "&",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "?",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "N",
        "O",
        "P",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "Z",
        "b",
        "d",
        "h",
        "k",
        "l",
        ";",
        "t",
        "<",
        ">",
        "a",
        "c",
        "e",
        "o",
        "s",
        ":",
        "n",
        "r",
        "u",
        "v",
        "x",
        "z",
        "~",
        "+",
        "=",
        "_",
        "^",
        "*",
        "-",
        '"',
        "'",
        ",",
        "`",
        ".",
        " ",
        "€",
        "£",
      ],
      unicode: 1,
      stretchH: 100,
      smooth: 1,
      aa: 1,
      padding: [2, 2, 2, 2],
      spacing: [0, 0],
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
    const font = await (await fetch(url)).arrayBuffer();

    this.parsedFonts = [parse(font)];
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
    const font = this.parsedFonts[0];

    const rectangles = glyphs.split("").map((g) => {
      const glyph = font.charToGlyph(g);

      const commands = glyph.getPath(0, 0, this.fontSize).commands;
      const bBox = glyph.getPath(0, 0, this.fontSize).getBoundingBox();

      const distanceRange = 4;
      const pad = distanceRange >> 1;

      const width = Math.round(bBox.x2 - bBox.x1) + pad + pad;
      const height = Math.round(bBox.y2 - bBox.y1) + pad + pad;
      const xOffset = Math.round(-bBox.x1) + pad;
      const yOffset = Math.round(-bBox.y1) + pad;

      const char = {
        id: glyph.index,
        index: glyph.index,
        char: g,
        width,
        height,
        xoffset: xOffset,
        yoffset: yOffset,
        xadvance: glyph.advanceWidth,
        chnl: 15,
        x: 0,
        y: 0,
        page: 0,
      };

      this.fontData.chars.push(char);

      const arrayLength = width * height * 3;
      const floatArray = new Float32Array(arrayLength);

      const dataPtr = this.module._malloc(
        floatArray.length * floatArray.BYTES_PER_ELEMENT,
      );
      this.module.HEAPF32.set(floatArray, dataPtr >> 2);

      const crds = new this.module.VectorDouble();
      const cmds = new this.module.VectorInt();

      commands.forEach((command) => {
        const { type, x, y, x1, y1, x2, y2 } = command as any; // TODO: Cubic, quadratic

        cmds.push_back(type.charCodeAt(0));

        switch (type) {
          case "M":
          case "L":
            crds.push_back(x);
            crds.push_back(y);
            break;
          case "C":
            crds.push_back(x1);
            crds.push_back(y1);
            crds.push_back(x2);
            crds.push_back(y2);
            crds.push_back(x);
            crds.push_back(y);
            break;
          case "Z":
            break;
          default:
            throw new Error(`Unknown command: ${type}`);
        }
      });

      this.module.generateMSDF(
        dataPtr,
        crds,
        cmds,
        width,
        height,
        distanceRange,
        1,
        xOffset,
        yOffset,
        3,
      );

      const resultTmp = this.module.HEAPF32.subarray(
        dataPtr >> 2,
        (dataPtr >> 2) + arrayLength,
      ) as Float32Array;

      const result = resultTmp.slice();

      this.module._free(dataPtr);

      crds.delete();
      cmds.delete();

      return {
        width,
        height,
        result,

        // "id": 124,
        // "index": 1319,
        // "char": "|",
        // "width": 10,
        // "height": 54,
        // "xoffset": 3,
        // "yoffset": 2,
        // "xadvance": 16,
        // "chnl": 15,
        // "x": 0,
        // "y": 0,
        // "page": 0
      };
    });

    // scaleW, scaleH, lineHeight
    this.fontData.common.scaleW = this.width;
    this.fontData.common.scaleH = this.height;
    this.fontData.common.lineHeight = 51;
    this.fontDataCallback?.(this.fontData);
    this.packer.addArray(rectangles as any);

    if (this.packer.bins.length > 1) {
      throw new Error("More that one bin");
    }

    this.packer.bins.forEach((bin) => {
      bin.rects.forEach(({ result, width, height, x, y }) => {
        if (!this.imageData) {
          return;
        }
        placeOnImageData(result, width, height, this.imageData, -x, -y);
      });
    });
    if (this.imageData) {
      this.imageDataCallback?.(this.imageData);
    }
  }
}
