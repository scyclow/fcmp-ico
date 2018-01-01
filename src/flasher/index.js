import './index.css'

// 255 => 'ff'
function cToHex(c) {
  var hex = Math.round(c).toString(16);
  return (hex.length === 1) ? '0' + hex : hex;
};

// { r:255, g:0, b:0 } => '#ff0000'
function rgbToHex(rgb) {
  var r = cToHex(rgb.r);
  var g = cToHex(rgb.g);
  var b = cToHex(rgb.b);

  return ['#', r, g, b].join('');
};

// 'ff' => 255
function hexToC(hex) {
  return parseInt(hex, 16);
};
// '#ff0000' => { r:255, g:0, b:0 }
function hexToRgb(hex) {
  var r = hexToC( hex.slice(1, 3) );
  var g = hexToC( hex.slice(3, 5) );
  var b = hexToC( hex.slice(5, 7) );

  return {r: r, g: g, b: b};
};

// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
// {r: 255, g: 0, b: 255} => {h: 100, s: 1, v: 1}
function rgbToHsv(rgb) {
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var diff = max - min;
  var value = max;
  var saturation = max ? diff / max : 0;

  var hue;
  if (!diff) {
    hue = 0;

  // For some reason website says "mod 6". This returns wonky
  // values, while + 6 appears to return the correct values.
  } else if (r === max) {
    hue = ((g - b) / diff) + 6;

  } else if (g === max) {
    hue = ((b - r) / diff) + 2;

  } else if (b === max) {
    hue = ((r - g) / diff) + 4;
  }

  hue *= 60;

  return {h: hue, s: saturation, v: value};
};

function hsvToRgb(hsv) {
  var c = hsv.v * hsv.s;
  var h = hsv.h / 60;
  var x = c * (1 - Math.abs(h % 2 - 1))
  var m = hsv.v - c;

  var r, g, b;
  switch( Math.floor(h) ) {
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
  };

  return {
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  };
};

function hsvToHex(hsv) {
  var rgb = hsvToRgb(hsv);
  return rgbToHex(rgb);
};

function increaseHue(hsv) {
  hsv.h += 1;
  if (hsv.h > 360) { hsv.h = 0; }
};


var currencySymbols = [
  '$',
  '&#165',  // ¥
  '$',
  '&#163',  // £
  '$',
  '&#8364', // €
  '&#8373', // ₵
  '$',
  '&#8364', // €
  '&#165',  // ¥
  '$',
  '&#8361', // ₩
  '&#8364', // €
  '$',
  '&#163',  // £
  '&#8369', // ₱
  '&#165',  // ¥
  '&#8377', // ₹
  '$',
  '&#163',  // £
  '$',
  '&#165',  // ¥
  '&#8364', // €
  '&#3647', // ฿
  '$',
  '&#8363', // ₫
  '$',
  '&#165',  // ¥
  '&#8361', // ₩
  '&#3647', // ฿
  '&#8373', // ₵
  '&#8364', // €
  '&#8353', // ₡
  '$',
  '&#165',  // ¥
  '&#163',  // £
  '$',
  '&#8366', // ₮
  '&#8369', // ₱
  '$',
  '&#163',  // £
  '&#8367'  //₯
];

// TODO - Symbols?
// State Object
var CHANGE_SYMBOL = true;
var SWITCH_ACTIVE = false;
var FAST_ACTIVE = false;
var CHANGE_COLOR = true;
var BUTTON_HOVER = null;

var TEXT_CHANGE = 100;
var COLOR_CHANGE = 20;
var COLOR_SWITCH = 100;
var BUTTON_SWITCH = 2000;


var $ = document.getElementById('cash');
var body = document.getElementsByTagName('body')[0];
var background = document.getElementById('background');
var mainContainer = document.getElementById('main-container');

// TODO - generator
var len = currencySymbols.length;
function changeSymbol() {
  if (!CHANGE_SYMBOL) return;
  var i = Math.floor(Math.random() * len);
  $.innerHTML = currencySymbols[i];
};

var textHSV = {h: 180, s: 1, v: 1};
var bodyHSV = {h: 0, s: 1, v: 1};
var backgroundTextHSV = {h: 120, s:1, v: 1};

function changeColor() { if (!CHANGE_COLOR) return;
  increaseHue(textHSV);
  increaseHue(bodyHSV);
  increaseHue(backgroundTextHSV);

  var textColor = hsvToHex(textHSV);
  var baseColor = hsvToHex(bodyHSV);

  body.style['color'] = textColor;
  body.style['background-color'] = baseColor;

  background.style['color'] = hsvToHex(backgroundTextHSV);
}

function switchColor() { if (!SWITCH_ACTIVE) return;
  var tmp = textHSV;
  textHSV = bodyHSV;
  bodyHSV = tmp;
};

function fast() { if (!FAST_ACTIVE) return;
  var symbol = currencySymbols[Math.floor(Math.random() * len)];
  var symbol2 = currencySymbols[Math.floor(Math.random() * len)];
  background.innerHTML += symbol + symbol2;
};


function activateSwitchColor() { SWITCH_ACTIVE = !SWITCH_ACTIVE; };
function activateChangeColor() { CHANGE_COLOR = !CHANGE_COLOR; };
function activateFast() { FAST_ACTIVE = !FAST_ACTIVE; };
function activateChangeSymbol() { CHANGE_SYMBOL = !CHANGE_SYMBOL;};

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.gain.value = 0.04;
gainNode.connect(audioCtx.destination);
var oscillator;
var currentInterval;
var soundMovement = 1;

var NOISE_PLAYING = false;
var FREQ_CHANGE = COLOR_CHANGE;

var intervals = [];
function noiseInterval() {
  oscillator.frequency.value = 0; // value in hertz
  currentInterval = setInterval(function() {
    var freq = oscillator.frequency;
    if (freq.value >= 1020) {
      soundMovement = -1;
    } else if (freq.value <= 10) {
      soundMovement = 1;
    }
    freq.value += soundMovement;
  }, FREQ_CHANGE);
  intervals.push(currentInterval);
}

var oscillators = [];
function startNoise() {
  NOISE_PLAYING = true;

  oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);

  oscillator.type = 'square';
  oscillator.detune.value = 100;
  oscillator.frequency.value = 8000;
  oscillator.start(0);
  setTimeout(noiseInterval, 100);
  oscillators.push(oscillator);
};

function endNoise() {
  NOISE_PLAYING = false;
  oscillators.forEach(function(osc) {
    osc.stop();  // not clearing sounds fucking awesome.
  });
  intervals.forEach(clearInterval);
};

function makeNoise() {
  // if (NOISE_PLAYING) { endNoise(); }
  // else { startNoise(); }
  startNoise();
}


mainContainer.onclick = function() {
  // activateSwitchColor();
  activateFast();
  makeNoise();
};

document.addEventListener("DOMContentLoaded", function() {
  setInterval(changeSymbol, TEXT_CHANGE);
  setInterval(fast, COLOR_CHANGE);
  setInterval(changeColor, COLOR_CHANGE);
  setInterval(switchColor, COLOR_SWITCH);
});

window.onkeydown = function(e){
  if (e.keyCode === 32) { } // spacebar
  // if (e.keyCode === 67) { activateSwitchColor(); } // c
  if (e.keyCode === 86) { activateChangeColor(); } // v
  if (e.keyCode === 66) { activateFast(); } // b
  if (e.keyCode === 78) { activateChangeSymbol(); } // n
  if (e.keyCode === 77) { endNoise(); } // m
};