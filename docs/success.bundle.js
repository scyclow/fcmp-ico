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
/******/ 	return __webpack_require__(__webpack_require__.s = 633);
/******/ })
/************************************************************************/
/******/ ({

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//  weak

var _ = __webpack_require__(54);

var keyDict = {
  enter: 13,
  space: 32,
  P: 80,
  p: 112
};

var $ = function $(elem, prop, value) {
  return elem.style[prop] = value;
};

$.qsa = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = $.cls = function (className) {
  return [].slice.call(document.getElementsByClassName(className));
};

$.eventDimensions = function (event) {
  return {
    x: event.clientX + window.pageXOffset,
    y: event.clientY + window.pageYOffset
  };
};

var eventListener = function eventListener(eventType, hasCoords) {
  return function () {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    return function (fn) {
      var one = function one(elem) {
        var listener = hasCoords ? $.coordsEvent(fn) : fn;
        elem.addEventListener(eventType, listener);
        var clear = function clear() {
          return elem.removeEventListener(eventType, listener);
        };
        return clear;
      };

      var multiple = function multiple(elems) {
        var clears = elems.map(one);
        return function () {
          return clears.map(_.runFn);
        };
      };

      return element.length && element.map ? multiple(element) : one(element);
    };
  };
};

$.onMouseMove = eventListener('mousemove', true);
$.onHover = eventListener('mouseover');
$.onOrient = function (fn) {
  return eventListener('deviceorientation')(window)($.orientEvent(fn));
};
$.onResize = eventListener('resize', true);

var keypress = function keypress(key) {
  return function (fn, element) {
    return eventListener('keypress')(element)(function (event) {
      if (event.keyCode === keyDict[key]) return fn(event);
    });
  };
};

// key: string | Array<string>
// => clearing function
$.onKeyPress = function (key) {
  if (_.isArray(key)) {
    // set all keypress events
    var presses = key.map(keypress);
    // return an eventListener function
    return function (fn, element) {
      // register all press events
      var clears = presses.map(function (press) {
        return press(fn, element);
      });
      // return a clearing fn
      return function () {
        return clears.forEach(_.runFn);
      };
    };
  } else {
    return keypress(key);
  }
};

$.center = $.getCenterOfElement = function (elem) {
  var _elem$getBoundingClie = elem.getBoundingClientRect(),
      top = _elem$getBoundingClie.top,
      bottom = _elem$getBoundingClie.bottom,
      left = _elem$getBoundingClie.left,
      right = _elem$getBoundingClie.right;

  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  };
};

$.coordsEvent = function (fn) {
  return function (event) {
    var coords = $.eventDimensions(event);
    var x = coords.x,
        y = coords.y;

    return fn({ coords: coords, event: event, x: x, y: y });
  };
};

$.orientEvent = function (fn) {
  return function (event) {
    var beta = event.beta,
        gamma = event.gamma,
        absolute = event.absolute,
        alpha = event.alpha;

    fn({ beta: beta, gamma: gamma, absolute: absolute, alpha: alpha, event: event });
  };
};

$.distanceFromCenter = function (elem, event) {
  return _.distance($.center(elem), event.coords || $.eventDimensions(event));
};

$.onHover = function (element) {
  return function (fnEnter, fnLeave) {
    if (!_.isFunction(fnLeave) && !element) {
      element = fnLeave;
      fnLeave = null;
    }

    var clears = [eventListener('mouseenter')(element)(fnEnter), fnLeave ? eventListener('mouseleave')(element)(fnLeave) : _.noop];

    return function () {
      return clears.forEach(_.runFn);
    };
  };
};

$.onClick = eventListener('click', true);

$.window = {
  // $FlowFixMe
  get width() {
    return window.innerWidth;
  },
  // $FlowFixMe
  get height() {
    return window.innerHeight;
  }
};

var parser = new DOMParser();
$.fromString = function (str) {
  return parser.parseFromString(str, 'text/xml').children[0];
};

$.appendString = function (el, str) {
  return el.appendChild($.fromString(str));
};

window.$ = $;
module.exports = $;

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getQueryParams = getQueryParams;
exports.getRef = getRef;
function getQueryParams() {
  return location.search.slice(1).split('&').reduce(function (params, param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    params[key] = value;
    return params;
  }, {});
}

function getRef() {
  var params = getQueryParams();
  var ref = params.r || params.ref || params.referral || localStorage.getItem('ref');

  if (ref) localStorage.setItem('ref', ref);

  return ref || '';
}

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//  weak



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _marked = /*#__PURE__*/regeneratorRuntime.mark(timeGen),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(enumerateArray),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(enumerateObject),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(enumerate);

var floor = Math.floor.bind(Math);
var round = Math.round.bind(Math);
var abs = Math.abs.bind(Math);
var max = Math.max.bind(Math);
var min = Math.min.bind(Math);

var toRadian = function toRadian(degree) {
  return degree * (Math.PI / 180);
};
var toDegree = function toDegree(radian) {
  return radian * 180 / Math.PI;
};

var sin = function sin(deg) {
  return Math.sin(toRadian(deg));
};
var cos = function cos(deg) {
  return Math.cos(toRadian(deg));
};
var tan = function tan(deg) {
  return Math.tan(toRadian(deg));
};
var asin = function asin(ratio) {
  return toDegree(Math.asin(ratio));
};
var acos = function acos(ratio) {
  return toDegree(Math.acos(ratio));
};
var atan = function atan(ratio) {
  return toDegree(Math.atan(ratio));
};

var runFn = function runFn(fn) {
  return fn();
};
var noop = function noop() {};
var assign = Object.assign;

function degreeAroundCenter(coords, center) {
  var x = center.x - coords.x;
  var y = center.y - coords.y;

  var rawDeg = atan(y / x);

  return x < 0 ? 180 + rawDeg : y < 0 ? 360 + rawDeg : rawDeg;
}

var atMost = function atMost(most) {
  return function (n) {
    return min(most, n);
  };
};
var atLeast = function atLeast(least) {
  return function (n) {
    return max(least, n);
  };
};
var isArray = Array.isArray.bind(Array);

function betweenLinear(n, high, low) {
  return low + (high - low) * n;
}

function portion(high, middle) {
  return (high - middle) / high;
}

function identity(arg) {
  return arg;
}

function between(n, high, low) {
  return max(min(n, high), low);
}

function wrap(number, max) {
  return number >= max ? wrap(number - max, max) : number < 0 ? wrap(max + number, max) : number;
}

function isNumber(num) {
  return typeof num === 'number' && num !== NaN;
}

function isBoolean(bool) {
  return typeof bool === 'boolean';
}

function isString(str) {
  return typeof str === 'string';
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isDefined(def) {
  return def !== undefined;
}

function last(thing) {
  return thing[thing.length - 1];
}

function random(i, j, k) {
  if (isBoolean(k) && k) return floor(random(i, j));
  // $FlowFixMe
  else if (isNumber(j)) return i + random(j - i);else if (isBoolean(j)) return floor(random(i));else return Math.random() * i;
}

function sample(a) {
  return a[random(0, a.length, true)];
}

function betweenLinear(n, max, min) {
  return min + (max - min) * n;
}

function portion(max, center) {
  return (max - center) / (max + 1);
}

function timeGen() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var i;
  return regeneratorRuntime.wrap(function timeGen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < t)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return fn(i);

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function times(t) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

  var output = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = timeGen(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      output.push(fn(i));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return output;
}

function each(arr) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  for (var i = 0; i < arr.length; i++) {
    var output = fn(arr[i], i);
    if (output === false) return false;
  }
  return arr;
}

function compact(arr) {
  return arr.filter(function (i) {
    return !!i || i === 0;
  });
}

function enumerateArray(iterable) {
  var i, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, iter;

  return regeneratorRuntime.wrap(function enumerateArray$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          i = 0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 4;
          _iterator2 = iterable[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 13;
            break;
          }

          iter = _step2.value;
          _context2.next = 10;
          return [iter, i++];

        case 10:
          _iteratorNormalCompletion2 = true;
          _context2.next = 6;
          break;

        case 13:
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2['catch'](4);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 19:
          _context2.prev = 19;
          _context2.prev = 20;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 22:
          _context2.prev = 22;

          if (!_didIteratorError2) {
            _context2.next = 25;
            break;
          }

          throw _iteratorError2;

        case 25:
          return _context2.finish(22);

        case 26:
          return _context2.finish(19);

        case 27:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[4, 15, 19, 27], [20,, 22, 26]]);
}

function enumerateObject(obj) {
  var key;
  return regeneratorRuntime.wrap(function enumerateObject$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = regeneratorRuntime.keys(obj);

        case 1:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 7;
            break;
          }

          key = _context3.t1.value;
          _context3.next = 5;
          return [obj[key], key];

        case 5:
          _context3.next = 1;
          break;

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function enumerate(iterable) {
  return regeneratorRuntime.wrap(function enumerate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.delegateYield(iterable[Symbol.iterator] ? enumerateArray(iterable) : enumerateObject(iterable), 't0', 1);

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function find(iterable, fn) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = enumerate(iterable)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref = _step3.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var iter = _ref2[0];
      var i = _ref2[1];

      if (fn(iter, i)) return iter;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return null;
}

function compose() {
  for (var _len = arguments.length, fnArr = Array(_len), _key = 0; _key < _len; _key++) {
    fnArr[_key] = arguments[_key];
  }

  return function () {
    return fnArr.slice(1).reduce(function (acc, fn) {
      return fn(acc);
    }, fnArr[0].apply(fnArr, arguments));
  };
}

function distance(a, b) {
  var xDiff = abs(a.x - b.x);
  var yDiff = abs(a.y - b.y);
  return Math.pow(Math.pow(xDiff, 2) + Math.pow(yDiff, 2), 0.5);
}

function pick(obj, props) {
  return props.reduce(function (output, prop) {
    return set(output, prop, obj[prop]);
  }, {});
}

function extend(obj1, obj2) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = enumerateObject(obj2)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _ref3 = _step4.value;

      var _ref4 = _slicedToArray(_ref3, 2);

      var key = _ref4[0];
      var val = _ref4[1];

      obj1[key] = val;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return obj1;
}

function cond(conditions) {
  var _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = conditions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _ref5 = _step5.value;

      var _ref6 = _slicedToArray(_ref5, 2);

      var condition = _ref6[0];
      var result = _ref6[1];

      if (condition) return result();
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return _default();
}

var propsPath = function propsPath(path) {
  return cond([[isString(path), function () {
    return path.split('.');
  }], [isArray(path), function () {
    return path;
  }]], function () {
    throw new Error('Path must be string or array');
  });
};

function get(obj, path, _default) {
  var props = propsPath(path);

  var lastObj = obj;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = props[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var prop = _step6.value;

      if (isDefined(lastObj[prop])) {
        lastObj = lastObj[prop];
      } else {
        return _default;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return lastObj;
}

function set(obj, path, val) {
  var props = propsPath(path);
  var existingProps = props.slice(0, -1);
  var lastProp = last(props);

  var lastObj = obj;
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = existingProps[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var prop = _step7.value;

      if (isDefined(lastObj[prop])) {
        lastObj = lastObj[prop];
      } else {
        var newObj = isNumber(Number(prop)) ? [] : {};
        lastObj[prop] = newObj;
        lastObj = newObj;
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  lastObj[lastProp] = val;
  return obj;
}

function take(a) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return a.slice(0, i);
}
function takeRight(a) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return a.slice(i * -1);
}

var promise = {
  wait: function wait(ms, result) {
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve(result);
      }, ms);
    });
  }
};

var exp = {
  between: between,
  betweenLinear: betweenLinear,
  wrap: wrap,
  portion: portion,
  identity: identity,
  times: times,
  isNumber: isNumber,
  isBoolean: isBoolean,
  isArray: isArray,
  isString: isString,
  isFunction: isFunction,
  floor: floor,
  round: round,
  abs: abs,
  max: max,
  min: min,
  atMost: atMost,
  atLeast: atLeast,
  random: random,
  sample: sample,
  last: last,
  compact: compact,
  enumerate: enumerate,
  find: find,
  compose: compose,
  distance: distance,
  runFn: runFn,
  noop: noop,
  set: set,
  pick: pick,
  extend: extend,
  assign: assign,
  get: get,
  cond: cond,
  each: each,
  take: take,
  takeRight: takeRight,

  sin: sin,
  cos: cos,
  tan: tan,
  asin: asin,
  acos: acos,
  atan: atan,
  toRadian: toRadian,
  toDegree: toDegree,
  degreeAroundCenter: degreeAroundCenter,

  promise: promise
};

module.exports = exp;
window._ = exp;

/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _$ = __webpack_require__(107);

var _$2 = _interopRequireDefault(_$);

var _2 = __webpack_require__(54);

var _3 = _interopRequireDefault(_2);

var _createSource4 = __webpack_require__(634);

var _createSource5 = _interopRequireDefault(_createSource4);

var _getRef = __webpack_require__(175);

__webpack_require__(635);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smoothTo = function smoothTo(obj, ctx) {
  return function (value, timeInSeconds) {
    obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds);
  };
};

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

var smoothGain1 = smoothTo(gain1.gain, ctx1);
var smoothFreq1 = smoothTo(source1.frequency, ctx1);

var smoothGain2 = smoothTo(gain2.gain, ctx2);
var smoothFreq2 = smoothTo(source2.frequency, ctx2);

var smoothGain3 = smoothTo(gain3.gain, ctx3);
var smoothFreq3 = smoothTo(source3.frequency, ctx3);

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

/***/ 634:
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

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });