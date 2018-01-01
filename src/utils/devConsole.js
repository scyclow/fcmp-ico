// @flow

import $ from 'utils/$';
import { getQueryParams} from 'utils/getRef'

console.log(getQueryParams())
window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);


if (getQueryParams().pause) {
  setTimeout(() => window.IMPORTANT.pause = true, 1000)
}
