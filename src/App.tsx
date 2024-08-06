import "./App.css";
import { createRenderer } from "../lib";
import { useEffect, useState } from "react";
import { CanvasTexture, Texture } from "three";
import { Canvas } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import { Font } from "@pmndrs/uikit/internals";
import { computed } from "@preact/signals-core";
import { NoColorSpace } from "three/src/constants";
import { Text } from "./text/text";

const canvas = document.createElement("canvas");
const canvasTexture = new CanvasTexture(canvas);

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
      <Canvas style={{ height: "100vh" }}>
        <mesh position={[2, 0, 0]}>
          <meshBasicMaterial map={texture} />
          <planeGeometry args={[2, 2]} />
        </mesh>

        <Fullscreen flexDirection="row" padding={10} gap={10}>
          {/*<DefaultProperties panelMaterialClass={MeshBasicMaterial}>*/}
          <Text fontSize={90} color="red">
            Hello
          </Text>

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

function saveImageDataAsPNG(
  imageData: ImageData,
  fileName: string = "image.png",
): void {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  // Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get 2D context");
  }

  // Put the image data onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL("image/png");

  // Create a link element
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataURL;

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

function saveAsJSON(data: any, fileName: string = "data.json"): void {
  // Convert the data to a JSON string
  const jsonString = JSON.stringify(data, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  // Revoke the URL to free up memory
  URL.revokeObjectURL(url);
}

function imageDataToBase64PNG(imageData: ImageData): string {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  // Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get 2D context");
  }

  // Put the image data onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL (base64 PNG)
  const dataURL = canvas.toDataURL("image/png");

  // Remove the "data:image/png;base64," prefix
  const base64String = dataURL.split(",")[1];

  return base64String;
}

export default App;
