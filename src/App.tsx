import "./App.css";
import { createRenderer } from "../lib";
import { useEffect, useState } from "react";
import { CanvasTexture, Texture } from "three";
import { Canvas } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import { Font } from "@pmndrs/uikit/internals";
import { computed, signal } from "@preact/signals-core";
import { NoColorSpace } from "three/src/constants";

const split2 = "abcdefghijklmnopqrstuvwxyz".split("");

const canvas = document.createElement("canvas");
const canvasTexture = new CanvasTexture(canvas);

const fontSignal = signal();

function App() {
  const [counter, setCounter] = useState(0);
  const [texture, setTexture] = useState(canvasTexture);
  const [font, setFont] = useState<Font>();

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
          t.colorSpace = NoColorSpace;
          setTexture(t);
        }
      });
      // fontData.subscribe((data) => {
      //   if (data) {
      //     console.log(data);
      //   }
      // });

      await renderer.setFonts(["/Inter-Bold.otf"]);

      await renderer.addGlyphs("ABCDEFGHIJKLMNOPQRSTUVWXYZ?");
      for (let i = 0; i < split2.length; i++) {
        await renderer.addGlyphs(split2[i]);
      }

      const f = computed(() => {
        if (!fontData.value) {
          return;
        }
        // return new Font(fontData.value, new Texture(imageData.value));
        return new Font(fontData.value, new Texture(imageData.value));
      });
      setFont(f);
    };
    create();
  }, []);
  return (
    <>
      <Canvas
        style={{ height: "100vh" }}
        onCreated={(state) => console.log(state)}
      >
        <mesh position={[2, 0, 0]}>
          <meshBasicMaterial map={texture} />
          <planeGeometry args={[2, 2]} />
        </mesh>

        <Fullscreen flexDirection="row" padding={10} gap={10}>
          {/*<DefaultProperties panelMaterialClass={MeshBasicMaterial}>*/}
          {/*<Text fontSize={90} color="red">*/}
          {/*  Hello*/}
          {/*</Text>*/}
          {/**/}
          {/*{font && texture ? (*/}
          {/*  <Text fontSize={42} color="red" fs={font}>*/}
          {/*    Hello*/}
          {/*  </Text>*/}
          {/*) : null}*/}
          {/*</DefaultProperties>*/}
        </Fullscreen>
      </Canvas>
    </>
  );
}

export default App;
