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
/******/ 	return __webpack_require__(__webpack_require__.s = 635);
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

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(636);

var _createSource4 = __webpack_require__(637);

var _createSource5 = _interopRequireDefault(_createSource4);

var _smoothTo = __webpack_require__(377);

var _smoothTo2 = _interopRequireDefault(_smoothTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startingFreq = 2000;

var MAX_VOLUME = 0.02;

var _createSource = (0, _createSource5.default)(0, 0.00000001, 'square'),
    source1 = _createSource.source,
    gain1 = _createSource.gain,
    ctx1 = _createSource.ctx;

var _createSource2 = (0, _createSource5.default)(0, 0.00000001, 'square'),
    source2 = _createSource2.source,
    gain2 = _createSource2.gain,
    ctx2 = _createSource2.ctx;

var _createSource3 = (0, _createSource5.default)(0, 0.00000001, 'square'),
    source3 = _createSource3.source,
    gain3 = _createSource3.gain,
    ctx3 = _createSource3.ctx;

var smoothGain1 = (0, _smoothTo2.default)(gain1.gain, ctx1);
var smoothFreq1 = (0, _smoothTo2.default)(source1.frequency, ctx1);

var smoothGain2 = (0, _smoothTo2.default)(gain2.gain, ctx2);
var smoothFreq2 = (0, _smoothTo2.default)(source2.frequency, ctx2);

var smoothGain3 = (0, _smoothTo2.default)(gain3.gain, ctx3);
var smoothFreq3 = (0, _smoothTo2.default)(source3.frequency, ctx3);

smoothGain1(MAX_VOLUME, 0.15);
smoothGain2(MAX_VOLUME, 0.15);
smoothGain3(MAX_VOLUME, 0.15);

var setFreq1 = function setFreq1() {
  smoothFreq1(source3.frequency.value * 2 || startingFreq, 0.15);
  setTimeout(function () {
    return smoothFreq1(100, 0.85);
  });
};

var setFreq2 = function setFreq2() {
  smoothFreq2(source1.frequency.value * 2 || startingFreq, 0.15);
  setTimeout(function () {
    return smoothFreq2(100, 0.85);
  });
};

var setFreq3 = function setFreq3() {
  smoothFreq3(source2.frequency.value * 2 || startingFreq, 0.15);
  setTimeout(function () {
    return smoothFreq3(100, 0.85);
  });
};

var duration = 1250;

setFreq1();
setInterval(setFreq1, duration);

setTimeout(function () {
  setFreq2();
  setInterval(setFreq2, duration);
}, duration * 0.333);

setTimeout(function () {
  setFreq3();
  setInterval(setFreq3, duration);
}, duration * 0.666);

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSource;
function createSource() {
  var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.04;
  var srcType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sine';

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ctx = new AudioContext();

  var source = ctx.createOscillator();
  var gain = ctx.createGain();

  source.connect(gain);
  gain.connect(ctx.destination);

  gain.gain.value = volume;
  source.type = srcType;
  source.frequency.value = freq;
  source.start();
  return { source: source, gain: gain, ctx: ctx };
}

/***/ })

/******/ });