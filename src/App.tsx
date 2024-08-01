import "./App.css";
import { addGlyphs, init } from "../lib";
import { useEffect, useState } from "react";
import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from "three";

(async function () {
  await init();
  const imageData = await addGlyphs("ABCDEFGHIJKLMNOP");
  renderBitmapToCanvas(imageData);

  setTimeout(async () => {
    const imageData = await addGlyphs("QRTSUVWXYZ");
    renderBitmapToCanvas(imageData);
  }, 5000);
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

export default App;
