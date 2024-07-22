import "./App.css";
import { library } from "./lib2";

async function loadFont() {
  const font = await (await fetch("/Inter-Bold.otf")).arrayBuffer();
  library(font);
}
loadFont();

function App() {
  return null;
}

export default App;
