// @flow weak

const _ = require('./_');

const keyDict = {
  enter: 13,
  space: 32,
  P: 80,
  p: 112
};

const $ = (elem, prop, value) => elem.style[prop] = value;

$.qsa = document.querySelectorAll.bind(document);
$.id = document.getElementById.bind(document);
$.class = $.cls = (className) => [].slice.call(document.getElementsByClassName(className));

$.eventDimensions = (event) => ({
  x: event.clientX + window.pageXOffset,
  y: event.clientY + window.pageYOffset,
});


const eventListener = (eventType, hasCoords) => (element = document) => (fn) => {
  const one = (elem) => {
    const listener = hasCoords ? $.coordsEvent(fn) : fn
    elem.addEventListener(eventType, listener);
    const clear = () => elem.removeEventListener(eventType, listener);
    return clear;
  };

  const multiple = (elems) => {
    const clears = elems.map(one);
    return () => clears.map(_.runFn);
  };

  return element.length && element.map
    ? multiple(element)
    : one(element);
}

$.onMouseMove = eventListener('mousemove', true);
$.onHover = eventListener('mouseover');
$.onOrient = (fn) => eventListener('deviceorientation')(window)($.orientEvent(fn));
$.onResize = eventListener('resize', true);

const keypress = (key) => (fn, element) => eventListener('keypress')(element)((event) => {
  if (event.keyCode === keyDict[key]) return fn(event);
});

// key: string | Array<string>
// => clearing function
$.onKeyPress = (key) => {
  if (_.isArray(key)) {
    // set all keypress events
    const presses = key.map(keypress);
    // return an eventListener function
    return (fn, element) => {
      // register all press events
      const clears = presses.map(press => press(fn, element));
      // return a clearing fn
      return () => clears.forEach(_.runFn);
    }
  }
  else {
    return keypress(key);
  }
}

$.center = $.getCenterOfElement = (elem) => {
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2
  }
}

$.coordsEvent = (fn) => (event) => {
  const coords = $.eventDimensions(event);
  const { x, y } = coords;
  return fn({ coords, event, x, y });
}

$.orientEvent = (fn) => (event) => {
  const { beta, gamma, absolute, alpha } = event;
  fn({ beta, gamma, absolute, alpha, event })
}

$.distanceFromCenter = (elem, event) => _.distance(
  $.center(elem),
  event.coords || $.eventDimensions(event)
);

$.onHover = (element) => (fnEnter, fnLeave) => {
  if (!_.isFunction(fnLeave) && !element) {
    element = fnLeave;
    fnLeave = null;
  }

  const clears = [
    eventListener('mouseenter')(element)(fnEnter),
    fnLeave ? eventListener('mouseleave')(element)(fnLeave) : _.noop
  ];

  return () => clears.forEach(_.runFn)
};

$.onClick = eventListener('click', true);

$.window = {
  // $FlowFixMe
  get width() { return window.innerWidth },
  // $FlowFixMe
  get height() { return window.innerHeight }
}

const parser = new DOMParser();
$.fromString = (str: string) => {
  return parser.parseFromString(str, 'text/xml').children[0];
}

$.appendString = (el, str) => el.appendChild($.fromString(str));

window.$ = $;
module.exports = $;
