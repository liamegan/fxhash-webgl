const frag = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 color;

uniform sampler2D s_main;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  color = texture(s_main, uv);

  color = mix(vec4(.15,.15,.15,1), color, color.a);
}`;

export { frag }