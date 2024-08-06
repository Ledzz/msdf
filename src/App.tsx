import "./App.css";
import { createRenderer } from "../lib";
import { useEffect, useState } from "react";
import { CanvasTexture, Texture } from "three";
import { Canvas } from "@react-three/fiber";
import { Root } from "@react-three/uikit";
import { Font } from "@pmndrs/uikit/internals";
import { computed } from "@preact/signals-core";
import { NoColorSpace } from "three/src/constants";
import { Text } from "./text/text";
import { OrbitControls } from "@react-three/drei";
import { imageDataToBase64PNG } from "./utils.ts";

const canvas = document.createElement("canvas");
const canvasTexture = new CanvasTexture(canvas);

function App() {
  const [counter, setCounter] = useState(0);
  const [texture, setTexture] = useState(canvasTexture);
  const [font, setFont] = useState<Font>();
  const [value, setValue] = useState("Hello");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((c) => c + 1);
  //   }, 50);
  //   return () => clearInterval(interval);
  // }, []);

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

          // saveImageDataAsPNG(data, "Inter-Bold.png");
        }
      });
      // fontData.subscribe((data) => {
      //   if (data) {
      //     // saveAsJSON(data, "Inter-Bold.json");
      //   }
      // });

      await renderer.setFonts(["/Inter-Bold.otf"]);

      await renderer.addGlyphs(
        "’|Wj@$()[]{}/\\w%MQm0fgipqy!#&123456789?ABCDEFGHIJKLNOPRSTUVXYZbdhkl;t<>aceos:nruvxz~+=_^*-\"',`. €£ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю",
      );

      await renderer.addGlyphs("お気に入りの寄付");

      computed(() => {
        if (!fontData.value || !imageData.value) {
          return;
        }
        const data = imageDataToBase64PNG(imageData.value);

        return { ...fontData.value, pages: ["data:image/png;base64," + data] };
      }).subscribe((data) => {
        // saveAsJSON(data, "Inter-Bold.json");
      });

      const f = computed(() => {
        const font = fontData.value;
        if (!font) {
          return;
        }
        // return new Font(fontData.value, new Texture(imageData.value));
        return new Font(font, new Texture(imageData.value));
      });

      setFont(f);
    };
    create();
  }, []);
  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <Canvas style={{ height: "100vh" }}>
        <OrbitControls />
        <mesh position={[2, 0, 0]}>
          <meshBasicMaterial map={texture} />
          <planeGeometry args={[2, 2]} />
        </mesh>

        <Root flexDirection="row" padding={10} gap={10}>
          {/*<DefaultProperties panelMaterialClass={MeshBasicMaterial}>*/}
          <Text fontSize={90} color="red">
            {value}
          </Text>

          {/*{font && texture ? (*/}
          {/*  <Text fontSize={42} color="red" fs={font}>*/}
          {/*    Hello*/}
          {/*  </Text>*/}
          {/*) : null}*/}
          {/*</DefaultProperties>*/}
        </Root>
      </Canvas>
    </>
  );
}

export default App;
