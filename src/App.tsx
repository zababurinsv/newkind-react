import React from 'react';
import { logo } from './logo';
import './App.css';

let requestFullscreen = (e: any) => {
    e.preventDefault();
    console.log('Отправлена форма.');
}

function App() {
  return (
    <div className="App">
      <header>
        <pre className="__peer-header_logo_value">{ logo }</pre>
        <div className="spinner" id='spinner'></div>
        <div className="emscripten" id="status">Downloading...</div>
          <span id='controls'>
        <span>
          <input type="checkbox" id="resize"/>
          Resize canvas
        </span>
        <span>
          <input type="checkbox" id="pointerLock" checked={true}/>
          Lock/hide mouse pointer
        </span>
        <span>
          <input
            type="button"
            value="Fullscreen"
            onClick={requestFullscreen}
          />
        </span>
      </span>
      </header>
      <div className="emscripten">
        <progress value="0" max="100" id="progress" hidden={true}></progress>
      </div>
      <div className="emscripten_border">
        <canvas className="emscripten" id="canvas" tabIndex={-1}></canvas>
      </div>
      <textarea id="output" rows={8}></textarea>
    </div>
  );
}
export default App;