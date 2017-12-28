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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ({

/***/ 49:
/***/ (function(module, exports) {

module.exports=function(scope){ return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 400" xml:space="preserve">
<path d="M150.2,133c19.5-18.4,46.2-28.5,72.5-28.5c22.5,0,40.5,4.9,49.9,10.5l10.1-25.2c-6.8-5.3-26.7-12.4-54.8-12.4
  c-37.2,0-69.4,12-95.4,34.2c-7.8,6.5-14.9,13.8-21.1,21.8L127,53.3h143.2l7.2-39.3H88.3L17.5,386.6h45.9l21.3-111.9
  c13.3,40,47.4,63.5,96.3,63.5c28.5,0,51.4-5.6,65.7-12l-4.1-25.5c-13.9,7.1-34.9,10.9-54.1,10.9c-56.3,0-77-37.2-77-82.6
  c0-3.7,0.1-7.4,0.4-11H227l7.7-39.3H120.5C127.2,160.7,137.4,144.9,150.2,133z"/>
</svg>
`};

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _FCSansSerif = __webpack_require__(49);

var _FCSansSerif2 = _interopRequireDefault(_FCSansSerif);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = new DOMParser();

var $test = document.getElementById('test');
for (var i = 0; i < 50; i++) {
  var $symbol = parser.parseFromString((0, _FCSansSerif2.default)(), 'image/svg+xml').children[0];
  $symbol.style.width = '18px';
  $test.appendChild($symbol);
}

/***/ })

/******/ });