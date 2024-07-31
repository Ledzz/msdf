import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from "three";

import { Font, parse } from "opentype.js";
import { MaxRectsPacker, Rectangle } from "maxrects-packer";

declare var Module;

type PackerRectangle = Rectangle & { result: Float32Array };

// export const CHARSET =
("’|Wj@$()[]{}/\\w%MQm0fgipqy!#&123456789?ABCDEFGHIJKLNOPRSTUVXYZbdhkl;t<>aceos:nruvxz~+=_^*-\"',`. €£");

export const CHARSET = "ABCDEF";

type Options = { width: number; height: number; fontSize: number };
const defaultOptions = {
  width: 512,
  height: 512,
  fontSize: 42,
} satisfies Options;

export class Renderer {
  width: number;
  height: number;
  fontSize: number;
  output: Uint8ClampedArray;
  imageData: ImageData;
  packer: MaxRectsPacker<PackerRectangle>;

  fonts?: Font[];
  urls?: string[];

  constructor(options?: Partial<Options>) {
    const optionsWithDefault = {
      ...defaultOptions,
      ...options,
    };

    this.width = optionsWithDefault.width;
    this.height = optionsWithDefault.height;
    this.fontSize = optionsWithDefault.fontSize;
    this.output = new Uint8ClampedArray(this.width * this.height * 4);
    this.imageData = new ImageData(this.output, this.width, this.height);

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

    this.fonts = [parse(font)];
  }

  async addGlyphs(glyphs: string) {
    if (!this.urls) {
      throw new Error("Font not specified");
    }
    // TODO: Find font with correct charset
    if (!this.fonts?.[0]) {
      await this.loadFont(this.urls[0]);
    }
    if (!this.fonts) {
      throw new Error("Unknown error");
    }
    const font = this.fonts[0];

    addGlyphs(
      this.packer,
      font,
      this.fontSize,
      glyphs,
      this.output,
      this.width,
      this.height,
    );

    renderBitmapToCanvas(this.imageData);
  }
}

function addGlyphs(
  packer: MaxRectsPacker<PackerRectangle>,
  font: Font,
  fontSize: number,
  glyphs: string,
  output: Uint8ClampedArray,
  totalWidth: number,
  totalHeight: number,
) {
  const rectangles = glyphs.split("").map((g) => {
    const glyph = font.charToGlyph(g);

    const commands = glyph.getPath(0, 0, fontSize).commands;
    const bBox = glyph.getPath(0, 0, fontSize).getBoundingBox();

    const distanceRange = 4;
    const pad = distanceRange >> 1;

    const width = Math.round(bBox.x2 - bBox.x1) + pad + pad;
    const height = Math.round(bBox.y2 - bBox.y1) + pad + pad;
    const xOffset = Math.round(-bBox.x1) + pad;
    const yOffset = Math.round(-bBox.y1) + pad;

    const arrayLength = width * height * 3;
    const floatArray = new Float32Array(arrayLength);

    const dataPtr = Module._malloc(
      floatArray.length * floatArray.BYTES_PER_ELEMENT,
    );
    Module.HEAPF32.set(floatArray, dataPtr >> 2);

    const crds = new Module.VectorDouble();
    const cmds = new Module.VectorInt();

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

    Module.generateMSDF(
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

    const resultTmp = Module.HEAPF32.subarray(
      dataPtr >> 2,
      (dataPtr >> 2) + arrayLength,
    ) as Float32Array;

    const result = resultTmp.slice();

    Module._free(dataPtr);

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

  packer.addArray(rectangles as any);

  if (packer.bins.length > 1) {
    throw new Error("More that one bin");
  }

  packer.bins.forEach((bin) => {
    bin.rects.forEach(({ result, width, height, x, y }) => {
      placeOnImageData(
        result,
        width,
        height,
        output,
        totalWidth,
        totalHeight,
        -x,
        -y,
      );
    });
  });
}

function placeOnImageData(
  data: Float32Array,
  iw: number,
  ih: number,
  output: Uint8ClampedArray,
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
) {
  for (let y = 0; y < height; y++) {
    const dy = y + offsetY;
    if (dy < 0 || dy >= ih) {
      continue;
    }

    for (let x = 0; x < width; x++) {
      const dx = x + offsetX;
      if (dx < 0 || dx >= iw) {
        continue;
      }

      const srcIdx = (dy * iw + dx) * 3;
      const destIdx = (y * width + x) * 4;

      output[destIdx] = data[srcIdx] * 255;
      output[destIdx + 1] = data[srcIdx + 1] * 255;
      output[destIdx + 2] = data[srcIdx + 2] * 255;
      output[destIdx + 3] = 255;
    }
  }
}

function renderBitmapToCanvas(imageData: ImageData) {
  const width = imageData.width;
  const height = imageData.height;
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = new WebGLRenderer({});
  renderer.setClearColor(0);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const geometry = new PlaneGeometry(width / height, 1, 1);
  // const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const map = new Texture(imageData);
  map.needsUpdate = true;

  const material = new ShaderMaterial({
    fragmentShader: `
   uniform sampler2D tex;
 varying vec2 vUv;
 
 float median(float r, float g, float b) {
            return max(min(r, g), min(max(r, g), b));
        }
 

   void main() {
        vec4 color = texture2D(tex, vUv);
        float m = smoothstep(0.2, 0.21, median(color.r, color.g, color.b));
        gl_FragColor = vec4(m, 0.0, 0.0, 1.0);
        gl_FragColor = color;
    }
   
   `,
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    uniforms: {
      tex: { value: map },
    },
  });
  material.transparent = true;
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 0.652;

  function animate() {
    renderer.render(scene, camera);
  }
}
