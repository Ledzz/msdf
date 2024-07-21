import './App.css'
import {library} from "./lib";




async function loadFont() {
    const font = await (await fetch('/Inter-Bold.otf')).arrayBuffer()
    library(font)
}

function App() {
    loadFont();
return null;
}

export default App
