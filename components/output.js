import { createRenderer } from "../lib/index.js";
import { vert } from "../shaders/screen.js";
import { frag } from "../shaders/output.js";
import { componentsMain } from "./mainBuffer.js";

const position = new Float32Array([-1, -1, 3, -1, -1, 3]);
const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

const components = {};

const init = (gl) => {
  components.renderer = createRenderer(gl, {
    vert,
    frag,
    attributes: {
      position: { data: position, size: 2 },
      uv: { data: uvs, size: 2 },
    },
    count: 3,
  });

};

const render = (gl, delta) => {
  // Bind the output vaos
  components.renderer.bindVAOs();

  // render to the canvas (setting null for target)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // Bind the read texture - this sis what was rendered last frame
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, componentsMain.fb.read.targetTexture);

  // bind the output texture uniform
  components.renderer.bindUniform("s_main", 0);
  components.renderer.bindUniform("u_time", delta * 0.001);
  components.renderer.bindUniform("u_resolution", [
    gl.canvas.width,
    gl.canvas.height,
  ]);

  // Render the output
  components.renderer.render(gl.canvas.width, gl.canvas.height);
};

export {
  init as initOutput,
  render as renderOutput,
  components as componentsOutput,
};
