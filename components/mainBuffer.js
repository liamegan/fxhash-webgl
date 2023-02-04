import { createRenderer, createFrameBuffer } from "../lib/index.js";
import { vert } from "../shaders/screen.js";
import { frag } from "../shaders/main.js";
import { cfg } from "../config.js";

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

  components.fb = createFrameBuffer(gl, {
    width: cfg.width,
    height: cfg.height,
    tiling: gl.REPEAT,
    type: gl.FLOAT,
    internalFormat: gl.RGBA32F,
  });

  return components;
};

const render = (gl, delta) => {
  const { width: w, height: h } = components.fb;
  // Bind the scene
  components.renderer.bindVAOs();

  // bind the framebuffer's write buffer - this is what will be written to
  gl.bindFramebuffer(gl.FRAMEBUFFER, components.fb.write.fb);

  // Bund the uniforms
  components.renderer.bindUniform("u_time", delta * 0.0004);
  components.renderer.bindUniform("u_resolution", [w, h]);

  // Render the scene
  components.renderer.render(w, h);

  // Swap the read/write buffers
  components.fb.swap();

  return components.fb.read.targetTexture;
};

export { init as initMain, render as renderMain, components as componentsMain };
