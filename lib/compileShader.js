const compileShader = (gl, source, type) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  // Error
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const progLog = gl.getShaderInfoLog(shader);
    throw new Error(progLog);
  }

  return shader;
};

export { compileShader };
