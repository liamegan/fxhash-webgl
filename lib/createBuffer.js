const createBuffer = (
  gl,
  data,
  usage = gl.STATIC_DRAW,
  type = gl.ARRAY_BUFFER
) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, usage);
  return buffer;
};

export { createBuffer };
