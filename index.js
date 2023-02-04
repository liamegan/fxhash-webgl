console.clear();

import { initMain, renderMain } from "./components/mainBuffer.js";
import { initOutput, renderOutput } from "./components/output.js";
import { cfg } from "./config.js";

const c = document.createElement("canvas");
const gl = c.getContext("webgl2", { alpha: true, premultipliedAlpha: true });

// gl.clearColor(1, 1, 1, 0);
// gl.colorMask(false, false, false, true);

// enable necessary extensions
gl.getExtension("EXT_color_buffer_float");
gl.getExtension("OES_texture_float_linear");
gl.getExtension("EXT_float_blend");

document.body.appendChild(c);

const resize = () => {
  c.width = cfg.width = window.innerWidth * cfg.dpr;
  c.height = cfg.height = window.innerHeight * cfg.dpr;
};
window.addEventListener("resize", resize);
resize();

initMain(gl);
initOutput(gl);

let playing = true;
window.addEventListener("click", (e) => {
  playing = !playing;
  if (playing) requestAnimationFrame(play);
});

const play = (delta) => {
  if (playing) requestAnimationFrame(play);

  renderMain(gl, delta);
  renderOutput(gl, delta);
};
requestAnimationFrame(play);
