import { compileShader } from "./compileShader.js";

const createProgram = (gl, vertexSrc, fragmentSrc) => {
  const v = compileShader(gl, vertexSrc, gl.VERTEX_SHADER);
  const f = compileShader(gl, fragmentSrc, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, v);
  gl.attachShader(program, f);

  gl.linkProgram(program);

  // Error logging
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const progLog = gl.getProgramInfoLog(program);
    throw new Error(progLog);
  }

  return program;
};

export { createProgram };
