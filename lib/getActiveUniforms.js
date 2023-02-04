const getActiveUniforms = (gl, program) => {
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  const uniforms = {};
  for (let i = 0; i < numUniforms; i++) {
    const { name, type } = gl.getActiveUniform(program, i);
    uniforms[name] = {
      location: gl.getUniformLocation(program, name),
      type,
    };
  }

  return uniforms;
};

export { getActiveUniforms };
