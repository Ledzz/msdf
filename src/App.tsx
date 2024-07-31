import "./App.css";
import { Renderer } from "./lib5";

async function loadFont() {
  const renderer = new Renderer();

  renderer.setFonts(["/Inter-Bold.otf"]);
  renderer.addGlyphs("ABCDEF");
}
loadFont();

function App() {
  return null;
}

export default App;
