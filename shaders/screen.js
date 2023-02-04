const vert = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

export { vert }