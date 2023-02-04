import { Mat2 } from "./Mat2.js";

const conversionFactor = 180 / Math.PI;

const radianToDegrees = function (radian) {
  return radian * conversionFactor;
};

const degreesToRadian = function (degrees) {
  return degrees / conversionFactor;
};
class Vec2 {
  constructor(...args) {
    this.reset(...args);
  }
  reset(...args) {
    let [x, y] = args;
    if (isNaN(x)) x = 0;
    if (isNaN(y)) y = 0;
    this.x = x;
    this.y = y;
    return this;
  }
  resetToVector(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  addNew(vector) {
    return this.clone().add(vector);
  }
  addScalar(scalar) {
    return this.add(new Vec2(scalar, scalar));
  }
  addScalarNew(scalar) {
    return this.clone().addScalar(scalar);
  }
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  subtractNew(vector) {
    return this.clone().subtract(vector);
  }
  subtractScalar(scalar) {
    return this.subtract(new Vec2(scalar, scalar));
  }
  subtractScalarNew(scalar) {
    return this.clone().subtractScalar(scalar);
  }
  divide(vector) {
    if (vector.x !== 0) {
      this.x /= vector.x;
    } else {
      this.x = 0;
    }
    if (vector.y !== 0) {
      this.y /= vector.y;
    } else {
      this.y = 0;
    }
    return this;
  }
  divideNew(vector) {
    return this.clone().divide(vector);
  }
  divideScalar(scalar) {
    var v = new Vec2(scalar, scalar);
    return this.divide(v);
  }
  divideScalarNew(scalar) {
    return this.clone().divideScalar(scalar);
  }
  multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }
  multiplyNew(vector) {
    return this.clone().multiply(vector);
  }
  multiplyScalar(scalar) {
    var v = new Vec2(scalar, scalar);
    return this.multiply(v);
  }
  multiplyScalarNew(scalar) {
    return this.clone().multiplyScalar(scalar);
  }
  scale(scalar) {
    return this.multiplyScalar(scalar);
  }
  scaleNew(scalar) {
    return this.multiplyScalarNew(scalar);
  }

  rotate(radian) {
    var x = this.x * Math.cos(radian) - this.y * Math.sin(radian);
    var y = this.x * Math.sin(radian) + this.y * Math.cos(radian);

    this.x = x;
    this.y = y;

    return this;
  }
  rotateNew(radian) {
    return this.clone().rotate(radian);
  }
  rotateDeg(degrees) {
    return this.rotate(degreesToRadian(degrees));
  }
  rotateDegNew(degrees) {
    return this.rotateNew(degreesToRadian(degrees));
  }
  rotateBy(radian) {
    return this.rotate(radian);
  }
  rotateByNew(radian) {
    return this.rotateNew(radian);
  }
  rotateDegBy(degrees) {
    return this.rotateDeg(degrees);
  }
  rotateDegByNew(radian) {
    return this.rotateDegNew(radian);
  }
  rotateTo(radian) {
    return this.rotate(radian - this.angle);
  }
  rotateToNew(radian) {
    return this.clone().rotateTo(radian);
  }
  rotateToDeg(degrees) {
    return this.rotateTo(degreesToRadian(degrees));
  }
  rotateToDegNew(degrees) {
    return this.rotateToNew(degreesToRadian(degrees));
  }
  negate() {
    return this.multiplyScalar(-1);
  }
  negateNew() {
    return this.multiplyScalarNew(-1);
  }
  inverse() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    return this;
  }
  inverseNew() {
    const c = this.clone();
    c.x = 1 / c.x;
    c.y = 1 / c.y;
    return c;
  }
  normalise() {
    return this.divideScalar(this.length);
  }
  normaliseNew() {
    return this.divideScalarNew(this.length);
  }
  distance(vector) {
    return this.subtractNew(vector).length;
  }
  distanceX(vector) {
    return this.x - vector.x;
  }

  distanceY(vector) {
    return this.y - vector.y;
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  det(vector) {
    return this.x * vector.y + this.y * vector.x;
  }

  slopeBetween(vector) {
    return (vector.y - this.y) / (vector.x - this.x);
  }
  cross(vector) {
    return this.x * vector.x - this.y * vector.y;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  ceilNew() {
    return this.clone().ceil();
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  floorNew() {
    return this.clone().floor();
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  roundNew() {
    return this.clone().round();
  }

  mod(vector) {
    this.x = this.x % vector.x;
    this.y = this.y % vector.y;
    return this;
  }

  modNew(vector) {
    return this.clone().mod(vector);
  }

  fract() {
    this.x -= Math.floor(this.x);
    this.y -= Math.floor(this.y);
    return this;
  }

  fractNew() {
    return this.clone().fract();
  }

  transformByMat2(m) {
    if (m.array) m = m.array; // This just transforms the matrix to an array.
    if (m instanceof Array && m.length >= 4) {
      const c = this.clone();
      this.x = m[0] * c.x + m[2] * c.y;
      this.y = m[1] * c.x + m[3] * c.y;
    }
    return this;
  }

  transformByMat2New(m) {
    return this.clone().transformByMat2(m);
  }

  transformByMat3(m) {
    if (m.array) m = m.array; // This just transforms the matrix to an array.
    if (m instanceof Array && m.length >= 9) {
      const c = this.clone();
      this.x = m[0] * c.x + m[3] * c.y + m[6];
      this.y = m[1] * c.x + m[4] * c.y + m[7];
    }
    return this;
  }

  transformByMat3New(m) {
    return this.clone().transformByMat3(m);
  }

  /**
   * Getters and setters
   */

  /**
   * (getter/setter) The x value of the vector.
   *
   * @type {number}
   * @default 0
   */
  #x = 0;
  set x(x) {
    if (typeof x == "number") {
      this.#x = x;
    } else {
      throw new TypeError("X should be a number");
    }
  }
  get x() {
    return this.#x || 0;
  }

  /**
   * (getter/setter) The y value of the vector.
   *
   * @type {number}
   * @default 0
   */
  #y = 0;
  set y(y) {
    if (typeof y == "number") {
      this.#y = y;
    } else {
      throw new TypeError("Y should be a number");
    }
  }
  get y() {
    return this.#y || 0;
  }

  /**
   * (getter/setter) The length of the vector presented as a square. If you're using
   * length for comparison, this is quicker.
   *
   * @type {number}
   * @default 0
   */
  set lengthSquared(length) {
    var factor;
    if (typeof length == "number") {
      factor = length / this.lengthSquared;
      this.multiplyScalar(factor);
    } else {
      throw new TypeError("length should be a number");
    }
  }
  get lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * (getter/setter) The length of the vector
   *
   * @type {number}
   * @default 0
   */
  set length(length) {
    var factor;
    if (typeof length == "number") {
      factor = length / this.length;
      this.multiplyScalar(factor);
    } else {
      throw new TypeError("length should be a number");
    }
  }
  get length() {
    return Math.sqrt(this.lengthSquared);
  }

  // Skips Math.sqrt for faster comparisons
  sqDistanceFrom(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;

    return dx * dx + dy * dy;
  }

  // Pythagorus: a^2 = b^2 + c^2
  distanceFrom(other) {
    return Math.sqrt(this.sqDistanceFrom(other));
  }

  /**
   * (getter/setter) The angle of the vector, in radians
   *
   * @type {number}
   * @default 0
   */
  set angle(radian) {
    if (typeof radian == "number") {
      this.rotateTo(radian);
    } else {
      throw new TypeError("angle should be a number");
    }
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * (getter/setter) The angle of the vector, in radians
   *
   * @type {number}
   * @default 0
   */
  set angleInDegrees(degrees) {
    if (typeof degrees == "number") {
      this.rotateToDeg(degrees);
    } else {
      throw new TypeError("angle should be a number");
    }
  }
  get angleInDegrees() {
    return radianToDegrees(Math.atan2(this.y, this.x));
  }

  /**
   * (getter/setter) Vector width.
   * Alias of {@link Vector#x x}
   *
   * @type {number}
   */
  set width(w) {
    this.x = w;
  }
  get width() {
    return this.x;
  }

  /**
   * (getter/setter) Vector height.
   * Alias of {@link Vector#x x}
   *
   * @type {number}
   */
  set height(h) {
    this.y = h;
  }
  get height() {
    return this.y;
  }

  /**
   * (getter) Vector area.
   * @readonly
   *
   * @type {number}
   */
  get area() {
    return this.x * this.y;
  }

  /**
   * (getter/setter) Vector slope.
   *
   * @type {number}
   */
  set slope(value) {
    if (!isNaN(value)) {
      let angle = Math.atan(value);
      this.angle = angle;
    }
  }
  get slope() {
    return this.y / this.x;
  }

  /**
   * (getter) Returns the basic array representation of this vector.
   * @readonly
   *
   * @type {number}
   */
  get array() {
    return [this.x, this.y];
  }

  /**
   * (getter/sette) Swizzle XY
   *
   * @type {number}
   */
  get xy() {
    return new Vec2(this.x, this.y);
  }
  set xy(v) {
    if (v instanceof Vec2) {
      this.resetToVector(v);
    } else if (v instanceof Array && v.length >= 2) {
      this.reset(v[0], v[1]);
    } else {
      throw new Error("input should be of type Vector");
    }
  }

  /**
   * (getter/sette) Swizzle YX
   *
   * @type {number}
   */
  get yx() {
    return new Vec2(this.y, this.x);
  }
  set yx(v) {
    this.xy = Vec2.interpolate(v).yx;
  }

  /**
   * (getter/sette) Swizzle XX
   *
   * @type {number}
   */
  get xx() {
    return new Vec2(this.x, this.x);
  }
  set xx(v) {
    v = Vec2.interpolate(v);
    this.x = v.y;
  }

  /**
   * (getter/sette) Swizzle YY
   *
   * @type {number}
   */
  get yy() {
    return new Vec2(this.y, this.y);
  }
  set yy(v) {
    v = Vec2.interpolate(v);
    this.y = v.y;
  }

  /**
   * Static methods
   */
  /**
   * Iterpolates a provided anonymous value into a vew Vec2
   *
   * @param {Vec2|array|string|number} v The value to interpolate
   * @returns {Vec2} out
   */
  static interpolate(v) {
    if (!isNaN(v.x) && !isNaN(v.x)) {
      // Vec2 or Vec2 like object
      return new Vec2(v.x, v.y);
    } else if (v instanceof Array && v.length >= 2) {
      // 2-dimensional array
      return new Vec2(v[0], v[1]);
    } else if (!isNaN(v)) {
      // Single number
      return new Vec2(v, v);
    } else if (typeof v === "string") {
      // comma delimited string of numbers
      const nv = v.split(",");
      const x = Number(nv[0]);
      const y = Number(nv[1]);
      if (nv.length >= 2 && !isNaN(x) && !isNaN(y)) {
        return new Vec2(x, y);
      }
    } else {
      throw new Error("The passed interpolant could not be parsed into a vec2");
    }
  }

  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} v1 the first operand
   * @param {vec2} v2 the second operand
   * @param {Number} d interpolation amount in the range of 0 - 1
   * @returns {Vec2}
   */
  static lerp(v1, v2, d) {
    return new Vec2(v1.x + d * (v2.x - v1.x), v1.y + d * (v2.y - v1.y));
  }

  /**
   * Finds the angle between 2 vectors.
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {number}
   */
  static getAngle(a, b) {
    a = a.clone();
    b = b.clone();

    a.normalise();
    b.normalise();

    const cosine = a.dot(b);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }
}

export { Vec2 };
