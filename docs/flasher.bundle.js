/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 629);
/******/ })
/************************************************************************/
/******/ ({

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj, ctx) {
  return function (value, timeInSeconds) {
    obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds);
  };
};

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(630);

var _smoothTo = __webpack_require__(377);

var _smoothTo2 = _interopRequireDefault(_smoothTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currencySymbols = ['$', '&#165', // ¥
'$', '&#163', // £
'$', '&#8364', // €
'&#8373', // ₵
'$', '&#8364', // €
'&#165', // ¥
'$', '&#8361', // ₩
'&#8364', // €
'$', '&#163', // £
'&#8369', // ₱
'&#165', // ¥
'&#8377', // ₹
'$', '&#163', // £
'$', '&#165', // ¥
'&#8364', // €
'&#3647', // ฿
'$', '&#8363', // ₫
'$', '&#165', // ¥
'&#8361', // ₩
'&#3647', // ฿
'&#8373', // ₵
'&#8364', // €
'&#8353', // ₡
'$', '&#165', // ¥
'&#163', // £
'$', '&#8366', // ₮
'&#8369', // ₱
'$', '&#163', // £
'&#8367' //₯
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

var cash = document.getElementById('cash');
var body = document.getElementsByTagName('body')[0];
var background = document.getElementById('background');
var mainContainer = document.getElementById('main-container');

// TODO - generator
var len = currencySymbols.length;
function changeSymbol() {
  if (!CHANGE_SYMBOL) return;
  var i = Math.floor(Math.random() * len);
  cash.innerHTML = currencySymbols[i];
};

var textHSV = { h: 180, s: 1, v: 1 };
var bodyHSV = { h: 0, s: 1, v: 1 };
var backgroundTextHSV = { h: 120, s: 1, v: 1 };

function fast() {
  var symbol = currencySymbols[Math.floor(Math.random() * len)];
  var symbol2 = currencySymbols[Math.floor(Math.random() * len)];
  background.innerHTML += symbol + symbol2;
};

// function activateSwitchColor() { SWITCH_ACTIVE = !SWITCH_ACTIVE; };
// function activateChangeColor() { CHANGE_COLOR = !CHANGE_COLOR; };
// function activateFast() { FAST_ACTIVE = !FAST_ACTIVE; };
// function activateChangeSymbol() { CHANGE_SYMBOL = !CHANGE_SYMBOL;};

var audioCtx = void 0,
    gain = void 0,
    oscillator = void 0,
    currentInterval = void 0,
    soundMovement = void 0,
    gainNode = void 0,
    NOISE_PLAYING = void 0,
    FREQ_CHANGE = void 0;
var inited = false;

function init() {
  if (inited) return;
  inited = true;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.04;
  gainNode.connect(audioCtx.destination);
  oscillator;
  currentInterval;
  soundMovement = 1;

  NOISE_PLAYING = false;
  FREQ_CHANGE = COLOR_CHANGE;
}

var intervals = [];
function noiseInterval() {
  var freq = oscillator.frequency;
  var smoothFreq = (0, _smoothTo2.default)(freq, audioCtx);
  smoothFreq(10, 0.25);
  var freqChange = FREQ_CHANGE * 10;

  currentInterval = setInterval(function () {
    if (freq.value >= 1020) {
      soundMovement = -10;
    } else if (freq.value <= 10) {
      soundMovement = 10;
    }
    smoothFreq(freq.value + soundMovement, freqChange);
    freq.value += soundMovement;
  }, freqChange);
  intervals.push(currentInterval);
}

var oscillators = [];
function startNoise() {
  init();
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
  oscillators.forEach(function (osc) {
    osc.stop(); // not clearing sounds fucking awesome.
  });
  intervals.forEach(clearInterval);
};

function makeNoise() {
  // if (NOISE_PLAYING) { endNoise(); }
  // else { startNoise(); }
  startNoise();
}

var fastInterval = void 0;
mainContainer.onclick = function () {
  if (fastInterval) {
    clearInterval(fastInterval);
    fastInterval = null;
  } else fastInterval = setInterval(fast, COLOR_CHANGE);
  makeNoise();
};

document.addEventListener("DOMContentLoaded", function () {
  setInterval(changeSymbol, TEXT_CHANGE);
  // setInterval(changeColor, COLOR_CHANGE);
});

// window.onkeydown = function(e){
//   if (e.keyCode === 32) { } // spacebar
//   // if (e.keyCode === 67) { activateSwitchColor(); } // c
//   if (e.keyCode === 86) { activateChangeColor(); } // v
//   if (e.keyCode === 78) { activateChangeSymbol(); } // n
//   if (e.keyCode === 77) { endNoise(); } // m
// };

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });