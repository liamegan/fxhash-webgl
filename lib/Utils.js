import { Vec2 } from "./Utils.js";

const rb = (min, max) => {
  return min + (max - min) * fxrand();
};

const pal = function (t, a, b, c, d) {
  const mp = new p5.Vector(
    Math.cos((c.x * t + d.x) * 6.28318),
    Math.cos((c.y * t + d.y) * 6.28318),
    Math.cos((c.z * t + d.z) * 6.28318)
  );
  return new p5.Vector(a.x + b.x * mp.x, a.y + b.y * mp.y, a.z + b.z * mp.z);
};
function n(p, s) {
  if (!s) s = g.nscale;
  return g.s.noise(...p.copy().mult(s).array());
}

function rp(frag, repl) {
  for (let i in repl) {
    frag = frag.replaceAll(`%%${i}%%`, repl[i]);
  }
  return frag;
}

class C {
  static r(c) {
    return c._array[0];
  }
  static g(c) {
    return c._array[1];
  }
  static b(c) {
    return c._array[2];
  }
}

function w(o) {
  let c = [];
  for (let i in o) c = c.concat(new Array(o[i][1]).fill(o[i][0]));
  return c[(fxrand() * c.length) | 0];
}
function lSquared(a) {
  return a.x * a.x + a.y * a.y;
}

const fract = (n) => Math.ceil((n < 1.0 ? n : n % Math.floor(n)) * 10000);
const clamp = (a, b, v) => Math.min(b, Math.max(a, v));
const smoothstep = function (edge0, edge1, x) {
  const t = clamp(0.0, 1.0, (x - edge0) / (edge1 - edge0));
  return t * t * (3.0 - 2.0 * t);
};
const lerp = (x, y, a) => x * (1 - a) + y * a;
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const cartesianToPolar = (p) => {
  return new Vec2(Math.hypot(p.x, p.y), Math.atan2(p.y, p.x));
};
const polarToCartesian = (p) => {
  return new Vec2(Math.cos(p.y) * p.x, Math.sin(p.y) * p.x);
};
const rotmat = (a) => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return new Mat2(c, -s, s, c);
};
const skewmat = (a, b) => {
  return new Mat2(1, tan(a), tan(b), 1);
};
const replaceOperands = (op, operands) => {
  for (let i in operands) {
    op = op.replaceAll(`_${i}`, `operands.${i}`);
  }
  return op;
};
const randomBetween = (min, max) => {
  return min + (max - min) * fxrand();
};

const isInt = (n) => {
  return Math.floor(n) == n;
};
const floatify = (n) => {
  if (n === true) return "1.0";
  if (n === false) return "0.0";
  if (isInt(n)) return `${n}.0`;
  if (isNaN(n)) return "0.0";
  return n;
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export {
  pal,
  clamp,
  smoothstep,
  n,
  rp,
  C,
  w,
  rb,
  lSquared,
  fract,
  cartesianToPolar,
  polarToCartesian,
  rotmat,
  skewmat,
  replaceOperands,
  randomBetween,
  floatify,
  shuffle,
  lerp,
  invlerp,
  range,
};
