const frag = `#version 300 es
  precision highp float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform sampler2D u_noise;
  
  out vec4 fragColour;
  
  // ----------------------------------------------
  // 2D SDF functions courtesy Inigo Quilez
  // https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
  // ----------------------------------------------
  float sdCross( in vec2 p, in vec2 b, float r ) {
    p = abs(p); p = (p.y>p.x) ? p.yx : p.xy;
    vec2  q = p - b;
    float k = max(q.y,q.x);
    vec2  w = (k>0.0) ? q : vec2(b.y-p.x,-k);
    return sign(k)*length(max(w,0.0)) + r;
  }
  const int N = 7;
  float sdPolygon( in vec2[N] v, in vec2 p ) {
    float d = dot(p-v[0],p-v[0]);
    float s = 1.0;
    for( int i=0, j=N-1; i<N; j=i, i++ ) {
      vec2 e = v[j] - v[i];
      vec2 w =    p - v[i];
      vec2 b = w - e*clamp( dot(w,e)/dot(e,e), 0.0, 1.0 );
      d = min( d, dot(b,b) );
      bvec3 c = bvec3(p.y>=v[i].y,p.y<v[j].y,e.x*w.y>e.y*w.x);
      if( all(c) || all(not(c)) ) s*=-1.0;  
    }
    return s*sqrt(d);
  }
  float sdEquilateralTriangle( in vec2 p ) {
    const float k = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    return -length(p)*sign(p.y);
  }
  float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
  }
  float sdChevron( in vec2 p, in vec2 b ) {
    float box = sdBox(p, b);
    return max(-box, sdBox(p - b*1.15, b));
  }
  
  const vec3 yellow = vec3(249./255., 234./255., 53./255.);
  const vec3 blue = vec3(150./255., 218./255., 234./255.);
  const vec3 green = vec3(133./255., 222./255., 118./255.);
  const vec3 pink = vec3(243./255., 98./255., 121./255.);
  const vec3 bg = vec3(16./255.,24./255.,32./255.);
  
  const float b = 150.;
  const vec2 trans = vec2(.5, -.5);
  const vec2 p1 = (vec2( 57./b, 0. )-.5)*trans;
  const vec2 p2 = (vec2( 124./b, 0. )-.5)*trans;
  const vec2 p3 = (vec2( 96./b, 49./b )-.5)*trans;
  const vec2 p4 = (vec2( 148./b, 49./b )-.5)*trans;
  const vec2 p5 = (vec2( 40./b, 155./b )-.5)*trans;
  const vec2 p6 = (vec2( 55./b, 97./b )-.5)*trans;
  const vec2 p7 = (vec2( 0., 97./b )-.5)*trans;
  
  // const vec2[] poly = vec2[](p1,p2,p3,p4,p5,p6,p7);
  
  vec2 transform(vec2 point, mat3 t) {
    vec3 i = vec3(point, 1.) * t;
    return i.xy;
  }
  
  mat2 rotate2d(float _angle) {
      return mat2(cos(_angle),sin(_angle),
                  -sin(_angle),cos(_angle));
  }

  // smooth min
  // reference: http://iquilezles.org/www/articles/smin/smin.htm
  float smin(float a, float b, float k) {
      float res = exp(-k*a) + exp(-k*b);
      return -log(res)/k;
  }
  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy + p3.yxx)*p3.zyx);
  }
  
  mat3 t, t2, t3;
  
  const float layers = 10.;
  const float zoomSpeed = 5.;
  const float zoomDepth = 4.;
  const float rscale = 5.;
  const float repeat = 1.3;
  const float halfRepeat = repeat*.5;
  
  vec4 layer(in vec2 uv, float scale, float i) {
    
    uv *= zoomDepth;
    uv *= rscale;
    vec2 id = floor(uv / repeat);
    uv -= halfRepeat;
    uv = mod(uv, repeat) - halfRepeat;

    vec3 hash = hash33(vec3(id, i));
    float s = floor(hash.x * 4.);
    float c = floor(hash.x * 4.);
    
    vec3 colour = vec3(0);
    vec3 col;

    float field;
    if(s == 0.) {
      vec2[] poly = vec2[](
        transform(p1,t),
        transform(p2,t),
        transform(p3,t),
        transform(p4,t),
        transform(p5,t),
        transform(p6,t),
        transform(p7,t));
      field = sdPolygon(poly, uv*2.-.5)/2.;
    } else if(s == 1.) {
      field = sdCross(uv-.5, vec2(.23*.5, .1*.5), 0.);
    } else if(s == 2.) {
      field = sdEquilateralTriangle(transform(uv, t3) * 7. + vec2(-3.5, 1)) / 7.;
    } else if(s == 3.) {
      field = sdChevron(uv * 2. + vec2(-.3, -.4), vec2(.2))*.5;
    }
    if(c == 0.) {
      col = yellow;
    } else if(c == 1.) {
      col = blue;
    } else if(c == 2.) {
      col = green;
    } else if(c == 3.) {
      col = pink;
    }

    // float bokeh = smoothstep(-.2, .5, scale);
    float bokeh = smoothstep(-.1, -4., scale) + smoothstep(-.2, 1., scale) * .5;
    float aa = fwidth(field)+bokeh;
    float glowwidth = .02+bokeh;
    float glow_opacity = .15;

    colour = mix(colour, col, smoothstep(.001 + aa, 0.001 - aa, field) - smoothstep(-.001 + aa, -0.001 - aa, field));


    return vec4(colour, length(colour*1.5));
  }
  
  vec4 layer(in vec2 uv) {
    return layer(uv, 0., 0.);
  }
  
  void renderLayer(in vec2 uv, in float i, in float time, inout vec4 colour) {
    float scale = mod( ( time + zoomSpeed / layers * i ) / zoomSpeed, -1. );
    uv *= scale;
    float _off = (i/layers);
    uv *= rotate2d(time + (_off*(3.14159*2.)));
    
    float opacity = smoothstep(-0.8, 0., scale); // fade up
    opacity *= smoothstep(0., -.08, scale); // fade down
    
    // float opacity = smoothstep(1., 0., scale); // fade up
    // opacity*=opacity;
    // opacity *= smoothstep(0., .08, scale); // fade down
    
    vec4 pass = layer( uv, scale, i );
    
    colour += pass * opacity;
  }

  vec4 zoom(vec2 uv) {
    vec4 pattern = vec4(0);
    
    for(float i = 1.; i <= layers; i++) {
      renderLayer(uv, i, u_time, pattern);
    }
    
    return vec4(pattern.rgb, 1./length(pattern.rgb))*5.;
  }
  
  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    
    vec2 offset = vec2(.1, .1);
    
    float a = atan(offset.x, offset.y);
    float s = sin(a);
    float c = cos(a);
    
    t = mat3(
      c, s, offset.x,
      -s, c, offset.y,
      0., 0., 1.
    );
    t2 = mat3(
      c, -s, 0,
      s, c, 0,
      0., 0., 1.
    );
    t3 = mat3(
      s, -c, 0,
      c, s, 0,
      0., 0., 1.
    );
    
    vec4 colour = zoom(uv);
    
    fragColour = vec4(mix(colour.rgb, bg, clamp(colour.a*.005, 0., 1.)), 1.);
  }`;

  export { frag }