// @flow weak

const { between, wrap } = require('./_');

function numToHex(num) {
  let hex = Math.round( Math.min(num, 255) ).toString(16);
  return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
}

const hexToNum = (hex) => parseInt(hex, 16);

const rgbToHex = ({r, g, b}) =>
  '#' + numToHex(r) + numToHex(g) + numToHex(b);

const hexToRgb = (hex) => hex.length === 7 ? {
    r: hexToNum( hex.slice(1, 3) ),
    g: hexToNum( hex.slice(3, 5) ),
    b: hexToNum( hex.slice(5, 7) )
  } : {
    r: hexToNum( hex.slice(1, 2).repeat(2) ),
    g: hexToNum( hex.slice(2, 3).repeat(2) ),
    b: hexToNum( hex.slice(3, 4).repeat(2) )
  };

const round = (n, decimals=0) => +n.toFixed(decimals);

// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
function rgbToHsv({r, g, b}) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const value = max;
  const saturation = max ? diff / max : 0;

  let hue = 0;
  if (!diff) {}
  // For some reason website says "mod 6". This returns wonky
  // values, while + 6 appears to return the correct values.
  else if (r === max) {
    hue = ((g - b) / diff) + 6;
  }
  else if (g === max) {
    hue = ((b - r) / diff) + 2;
  }
  else if (b === max) {
    hue = ((r - g) / diff) + 4;
  }

  hue *= 60;

  return {
    h: (hue === 360) ? 0 : hue,
    s: round(saturation, 2),
    v: round(value, 2)
  };
}

function hsvToRgb({ h, s, v }) {
  h /= 60;
  const c = v * s;
  const x = c * (1 - Math.abs(h % 2 - 1));
  const m = v - c;

  let r, g, b;
  switch (Math.floor(h)) {
    case 0:
    case 6:
      r = c; g = x; b = 0; break;
    case 1:
      r = x; g = c; b = 0; break;
    case 2:
      r = 0; g = c; b = x; break;
    case 3:
      r = 0; g = x; b = c; break;
    case 4:
      r = x; g = 0; b = c; break;
    case 5:
      r = c; g = 0; b = x; break;
  }

  return {
    r: round((r + m) * 255),
    g: round((g + m) * 255),
    b: round((b + m) * 255)
  };
}

const hexToHsv = (hex) => rgbToHsv( hexToRgb(hex) );
const hsvToHex = (hsv) => rgbToHex( hsvToRgb(hsv) );

type HSV = {
  h?: number,
  s?: number,
  v?: number
};

function applyToHex(hex: string, {h=0, s=0, v=0}: HSV, mod=1): string {
  let hsv = hexToHsv(hex);
  return hsvToHex({
    h:    wrap(hsv.h + (h / mod), 360),
    s: between(hsv.s + (s / mod), 1, 0),
    v: between(hsv.v + (v / mod), 1, 0)
  });
}

// experimental
function setHsvOnHex(hex, {h, s, v}) {
  const hsv = hexToHsv(hex);
  return hsvToHex({
    h: !isNaN(h) ?    wrap(h, 360)  : hsv.h,
    s: !isNaN(s) ? between(s, 1, 0) : hsv.s,
    v: !isNaN(v) ? between(v, 1, 0) : hsv.v
  });
}

const randMax = (ceil) => Math.floor(
  Math.random() * ceil
);

function randHex() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += randMax(16).toString(16);
  }
  return color.toUpperCase();
}

function polarize(hex) {
  return applyToHex(hex, { h: 180 })
}

module.exports = {
  applyToHex,
  __experimental__: { setHsvOnHex },
  hexToNum,
  hexToRgb,
  hsvToRgb,
  numToHex,
  rgbToHex,
  rgbToHsv,
  randHex,
  polarize
};
