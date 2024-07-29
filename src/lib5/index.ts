import * as typr from "@fredli74/typr";
import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from "three";

declare var Module;

// console.log(Module);

export function library(data: ArrayBuffer) {
  console.time("font");
  const font = new typr.Font(data);
  const glyph = font.stringToGlyphs("Q")[0];
  const path = font.glyphToPath(glyph);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 2000 2000");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  svg.innerHTML = `<path d="${font.pathToSVG(path)}" fill="black" />`;
  document.body.append(svg);

  const crds = new Module.VectorDouble();
  const cmds = new Module.VectorInt();

  for (let i = 0; i < path.crds.length; i++) {
    crds.push_back(path.crds[i]);
  }
  for (let i = 0; i < path.cmds.length; i++) {
    cmds.push_back(path.cmds[i].charCodeAt(0));
  }

  const res = Module.generateMSDF(crds, cmds, -0.5, 0.5, 0.01, 0.125, 0.125);

  const arr = [];

  for (let i = 0; i < res.size(); i++) {
    arr.push(res.get(i));
  }

  renderBitmapToCanvas(arr);

  crds.delete();
  cmds.delete();
  console.timeEnd("font");
}

function renderBitmapToCanvas(data: number[], width = 32, height = 32) {
  const imageData = new ImageData(width, height);

  for (let i = 0; i < width * height; i++) {
    imageData.data[4 * i] = data[3 * i];
    imageData.data[4 * i + 1] = data[3 * i + 1];
    imageData.data[4 * i + 2] = data[3 * i + 2];
    imageData.data[4 * i + 3] = 255;
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  const renderer = new WebGLRenderer();
  renderer.setSize(width * 10, height * 10);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const geometry = new PlaneGeometry(1, 1, 1);
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
        float m = smoothstep(0.5, 0.51, median(color.r, color.g, color.b));
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
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 0.652;

  function animate() {
    renderer.render(scene, camera);
  }
}
