// @flow

import $ from 'utils/$';
import { getQueryParams} from 'utils/getRef'

window.IMPORTANT = {
  pause: getQueryParams.pause || false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);


setTimeout(() => window.IMPORTANT.pause = true, 1000)
