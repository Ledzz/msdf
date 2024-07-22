import './App.css'
import {library} from "./lib1";




async function loadFont() {
    const font = await (await fetch('/Inter-Bold.otf')).arrayBuffer()
    library(font)
}

function App() {
    loadFont();
return null;
}

export default App
