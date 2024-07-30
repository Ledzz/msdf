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

declare var Module;

export function library(data: ArrayBuffer) {
  const font = parse(data);
  const totalWidth = 128;
  const totalHeight = 128;
  const imageData = new ImageData(totalWidth, totalHeight);

  const fontSize = 42;

  console.time("renderGlyph");
  renderGlyph(font, "A", fontSize, imageData, 0, 0);
  renderGlyph(font, "B", fontSize, imageData, -40, 0);
  renderGlyph(font, "C", fontSize, imageData, -80, 0);
  renderGlyph(font, "D", fontSize, imageData, 0, -40);
  renderGlyph(font, "E", fontSize, imageData, -40, -40);
  renderGlyph(font, "F", fontSize, imageData, -80, -40);
  console.timeEnd("renderGlyph");

  renderBitmapToCanvas(imageData);
}

function renderGlyph(
  font: Font,
  glyph: string,
  fontSize: number,
  imageData: ImageData,
  x: number,
  y: number,
) {
  const glyph1 = font.charToGlyph(glyph);

  const commands = glyph1.getPath(0, 0, fontSize).commands;
  const bBox = glyph1.getPath(0, 0, fontSize).getBoundingBox();

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

  const resultArray = Module.HEAPF32.subarray(
    dataPtr >> 2,
    (dataPtr >> 2) + arrayLength,
  );

  placeOnImageData(resultArray, width, height, imageData, x, y);
  Module._free(dataPtr);

  crds.delete();
  cmds.delete();
}

function placeOnImageData(
  data: Float32Array,
  iw: number,
  ih: number,
  imageData: ImageData,
  offsetX: number,
  offsetY: number,
) {
  const { width, height } = imageData;
  const { data: destData } = imageData;

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

      destData[destIdx] = data[srcIdx] * 255;
      destData[destIdx + 1] = data[srcIdx + 1] * 255;
      destData[destIdx + 2] = data[srcIdx + 2] * 255;
      destData[destIdx + 3] = 255;
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
