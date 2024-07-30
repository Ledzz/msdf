import "./App.css";
import { Renderer } from "./lib5";

async function loadFont() {
  const font = await (await fetch("/Inter-Bold.otf")).arrayBuffer();
  // library(font);

  const renderer = new Renderer();

  renderer.loadFont(font);

  renderer.addGlyphs("ABCDEF");
}
loadFont();

function App() {
  return null;
}

export default App;
