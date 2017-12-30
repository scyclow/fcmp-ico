// @flow

import $ from 'utils/$';

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);


// setTimeout(() => window.IMPORTANT.pause = true, 1000)
