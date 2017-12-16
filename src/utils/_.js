// @flow weak

'use strict';

const floor = Math.floor.bind(Math);
const round = Math.round.bind(Math);
const abs = Math.abs.bind(Math);
const max = Math.max.bind(Math);
const min = Math.min.bind(Math);

const toRadian = (degree: number) => degree * (Math.PI / 180);
const toDegree = (radian: number) => (radian * 180) / Math.PI;

const sin = (deg: number) => Math.sin(toRadian(deg));
const cos = (deg: number) => Math.cos(toRadian(deg));
const tan = (deg: number) => Math.tan(toRadian(deg));
const asin = (ratio: number) => toDegree(Math.asin(ratio));
const acos = (ratio: number) => toDegree(Math.acos(ratio));
const atan = (ratio: number) => toDegree(Math.atan(ratio));

const runFn = (fn: Function) => fn();
const noop = () => {};
const assign = Object.assign;

type Coords = { x: number, y: number };
function degreeAroundCenter(coords: Coords, center: Coords): number {
  const x = center.x - coords.x;
  const y = center.y - coords.y;

  const rawDeg = atan(y / x);

  return (
    x < 0 ? 180 + rawDeg :
    y < 0 ? 360 + rawDeg :
    rawDeg
  );
}


const atMost = (most: number) => (n: number): number => min(most, n);
const atLeast = (least: number) => (n: number): number => max(least, n);
const isArray = Array.isArray.bind(Array);


function betweenLinear(n: number, high: number, low: number): number {
  return low + ((high - low) * n);
}

function portion(high: number, middle: number): number {
  return (high - middle) / high;
}

function identity<T>(arg: T): T {
  return arg;
}

function between(n: number, high: number, low: number): number {
  return max(
    min(n, high), low
  );
}

function wrap(number: number, max: number): number {
  return (
    number >= max ? wrap(number - max, max) :
    number < 0    ? wrap(max + number, max) :
    number
  );
}

function isNumber(num: any): boolean {
  return typeof num === 'number' && num !== NaN;
}

function isBoolean(bool: any): boolean {
  return typeof bool === 'boolean';
}

function isString(str: any): boolean {
  return typeof str === 'string';
}

function isFunction(fn: any): boolean {
  return typeof fn === 'function';
}

function isDefined(def) {
  return def !== undefined;
}

function last(thing: Array<any> | string) {
  return thing[thing.length - 1];
}

function random(i: number, j: number | boolean | void, k: boolean | void): number {
  if (isBoolean(k) && k) return floor(random(i, j))
  // $FlowFixMe
  else if (isNumber(j))  return i + random(j - i)
  else if (isBoolean(j)) return floor(random(i))
  else                   return Math.random() * i
}

function betweenLinear(n: number, max: number, min: number): number {
  return min + ((max - min) * n);
}

function portion(max: number, center: number): number {
  return (max - center) / (max+1);
}

function *timeGen(t: number=Infinity, fn=identity) {
  for (let i = 0; i < t; i++) yield fn(i);
}

function times(t: number, fn = identity): Array<any> {
  let output = [];
  for (let i of timeGen(t)) output.push(fn(i));
  return output;
}

function compact(arr: Array<any>): Array<any> {
  return arr.filter(i => !!i || i === 0);
}

function* enumerateArray(iterable) {
  let i = 0;
  for (let iter of iterable) {
    yield [iter, i++];
  }
}

function* enumerateObject(obj) {
  for (let key in obj) {
    yield [obj[key], key];
  }
}

function* enumerate(iterable) {
  yield* iterable[Symbol.iterator] ? enumerateArray(iterable) : enumerateObject(iterable);
}

function find<T>(iterable: Array<T>, fn): T | null {
  for (let [iter, i] of enumerate(iterable)) {
    if (fn(iter, i)) return iter;
  }

  return null;
}

function compose(...fnArr: Array<Function>): Function {
  return (...args) => fnArr.slice(1).reduce((acc, fn) => fn(acc), fnArr[0](...args));
}

function distance(a: Coords, b: Coords): number {
  const xDiff = abs(a.x - b.x);
  const yDiff = abs(a.y - b.y);
  return ((xDiff ** 2) + (yDiff ** 2)) ** 0.5;
}

function pick(obj, props) {
  return props.reduce((output, prop) => set(output, prop, obj[prop]), {});
}

function extend(obj1, obj2) {
  for (let [key, val] of enumerateObject(obj2)) {
    obj1[key] = val
  }

  return obj1;
}

function cond(conditions, _default = noop) {
  for (let [condition, result] of conditions) {
    if (condition) return result();
  }
  return _default()
}

const propsPath = (path) => cond([
  [isString(path), () => path.split('.')],
  [isArray(path), () => path]
], () => { throw new Error('Path must be string or array') });

function get(obj, path, _default) {
  const props = propsPath(path);

  let lastObj = obj;
  for (let prop of props) {
    if (isDefined(lastObj[prop])) {
      lastObj = lastObj[prop]
    }
    else {
      return _default;
    }
  }

  return lastObj;
}


function set(obj, path, val) {
  const props = propsPath(path);
  const existingProps = props.slice(0, -1);
  const lastProp = last(props);

  let lastObj = obj;
  for (let prop of existingProps) {
    if (isDefined(lastObj[prop])) {
      lastObj = lastObj[prop];
    }
    else {
      const newObj = isNumber(Number(prop)) ? [] : {};
      lastObj[prop] = newObj;
      lastObj = newObj;
    }
  }

  lastObj[lastProp] = val;
  return obj;
}

const promise = {
  wait: (ms, result) => new Promise(resolve =>
    setTimeout(() => resolve(result), ms)
  )
};



module.exports = {
  between,
  betweenLinear,
  wrap,
  portion,
  identity,
  times,
  isNumber,
  isBoolean,
  isArray,
  isString,
  isFunction,
  floor,
  round,
  abs,
  max,
  min,
  atMost,
  atLeast,
  random,
  last,
  compact,
  enumerate,
  find,
  compose,
  distance,
  runFn,
  noop,
  set,
  pick,
  extend,
  assign,
  get,
  cond,

  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  toRadian,
  toDegree,
  degreeAroundCenter,

  promise
};
