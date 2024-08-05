import "./App.css";
import { createRenderer } from "../lib";
import { useEffect, useState } from "react";
import { CanvasTexture, Texture } from "three";
import { Canvas } from "@react-three/fiber";
import { Fullscreen, Text } from "@react-three/uikit";

const split2 = "abcdefghijklmnopqrstuvwxyz".split("");

const canvas = document.createElement("canvas");
const canvasTexture = new CanvasTexture(canvas);

function App() {
  const [counter, setCounter] = useState(0);
  const [texture, setTexture] = useState(canvasTexture);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const create = async () => {
      const { renderer, imageData, fontData } = await createRenderer();
      // document.body.appendChild(canvas);

      imageData.subscribe((data) => {
        if (data) {
          const t = new Texture(data);
          t.needsUpdate = true;
          setTexture(t);
        }
      });
      fontData.subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
      await renderer.setFonts(["/Inter-Bold.otf"]);

      await renderer.addGlyphs("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      for (let i = 0; i < split2.length; i++) {
        await renderer.addGlyphs(split2[i]);
      }
    };
    create();
  }, []);

  return (
    <>
      <Canvas style={{ height: "100vh" }}>
        <mesh>
          <meshBasicMaterial map={texture} />
          <planeGeometry args={[2, 2]} />
        </mesh>

        <Fullscreen flexDirection="row" padding={10} gap={10}>
          <Text fontSize={1} color="red">
            Hello
          </Text>
        </Fullscreen>
      </Canvas>
    </>
  );
}

export default App;
