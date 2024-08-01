import "./App.css";
import { createRenderer } from "../lib";
import { useEffect, useState } from "react";
import {
  DataTexture,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from "three";
// import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

const test = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const split = test.split("");

// (async function () {
//   const renderer = createRenderer();
//   const canvas = document.createElement("canvas");
//   document.body.appendChild(canvas);
//   await renderer.init({
//     mode: "ImageData",
//   });
//   await renderer.setFonts(["/Inter-Bold.otf"]);
//
//   console.time("ImageData");
//   for (let i = 0; i < split.length; i++) {
//     renderBitmapToCanvas(await renderer.addGlyphs(split[i]), canvas);
//   }
//   console.timeEnd("ImageData");
// })();

// (async function () {
//   const canvas = document.createElement("canvas");
//   const offscreen = canvas.transferControlToOffscreen();
//   const renderer = createRenderer();
//   await renderer.init(
//     Comlink.transfer(
//       {
//         mode: "OffscreenCanvas",
//         canvas: offscreen,
//       },
//       [offscreen],
//     ),
//   );
//   await renderer.setFonts(["/Inter-Bold.otf"]);
//
//   const split = test.split("");
//   document.body.appendChild(canvas);
//
//   console.time("OffscreenCanvas");
//   for (let i = 0; i < split.length; i++) {
//     await renderer.addGlyphs(split[i]);
//   }
//   console.timeEnd("OffscreenCanvas");
// })();

(async function () {
  const canvas = document.createElement("canvas");
  const renderer = createRenderer();
  const sab = new SharedArrayBuffer(512 * 512 * 4);
  await renderer.init({
    mode: "SharedArrayBuffer",
    sab,
  });
  await renderer.setFonts(["/Inter-Bold.otf"]);

  const split = test.split("");
  document.body.appendChild(canvas);

  console.time("SharedArrayBuffer");
  for (let i = 0; i < split.length; i++) {
    await renderer.addGlyphs(split[i]);
  }
  console.timeEnd("SharedArrayBuffer");

  setTimeout(() => {
    renderSAB(sab, 512, 512, canvas);
  }, 1000);
})();

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return counter;
}

function renderBitmapToCanvas(imageData: ImageData, canvas: HTMLCanvasElement) {
  const width = imageData.width;
  const height = imageData.height;
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = new WebGLRenderer({ canvas });
  renderer.setClearColor(0);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animate);

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
    map.needsUpdate = true;
  }
}

function renderSAB(
  sab: SharedArrayBuffer,
  width: number,
  height: number,
  canvas: HTMLCanvasElement,
) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = new WebGLRenderer({ canvas });
  renderer.setClearColor(0);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animate);

  const geometry = new PlaneGeometry(width / height, 1, 1);
  // const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const map = new DataTexture(new Uint8Array(sab), width, height, RGBAFormat);
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
    map.needsUpdate = true;
  }
}

export default App;
