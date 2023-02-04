import { createBuffer } from "./createBuffer.js";

const createVertexArray = (gl, program, attributes) => {
  if (!attributes) return null;

  const vao = gl.createVertexArray();
  const names = Object.keys(attributes);

  gl.bindVertexArray(vao);

  for (let i = 0; i < names.length; i++) {
    let {
      size = 1,
      type = gl.FLOAT,
      normalize = false,
      stride = 0,
      offset = 0,
      buffer,
      data,
      usage = gl.STATIC_DRAW,
      buffertype = gl.ARRAY_BUFFER,
    } = attributes[names[i]];

    if (data && !buffer) buffer = createBuffer(gl, data, usage, buffertype);

    gl.bindAttribLocation(program, i, names[i]);
    gl.enableVertexAttribArray(i);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(i, size, type, normalize, stride, offset);
  }

  return vao;
};

export { createVertexArray };
