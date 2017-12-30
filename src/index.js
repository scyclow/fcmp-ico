// @flow

import 'index.css';
import 'babel-polyfill'
import './utils/devConsole'
import './legacy'
import {getRef} from 'utils/getRef'
import _ from 'utils/_'
import $ from 'utils/$'
import { polarize, applyToHex } from 'utils/colors';
import {tickerGenerator} from 'utils/randCurrency'


const { changeColors } = require('./utils/updateColor');


const referral = getRef()

const $currencyTicker = $.id('currencyTicker');
const $content = $.id('content');
const $hero = $.id('hero');
const $warning = $.id('warning');
const $callToAction = $.id('call-to-action');

const ctaPrompts = [
 'START NOW',
 '100% SECURE',
 '100% LEGAL',
 '100% ONLINE',
 'MAKE CASH FAST',
 'MAKE FAST CASH',
 'CLICK HERE',
 'SAFE AND SECURE',
 'FUEL YOUR DREAMS TODAY',
]

$callToAction.innerHTML = _.sample(ctaPrompts)
setInterval(() => $callToAction.innerHTML = _.sample(ctaPrompts), 2000)

let contentBorderH = 1
setInterval(
  () => changeColors($content, '#ff0000', {primary: ['border-color'], secondary: []})(contentBorderH++),
  20
);

let heroH = 1;
$($hero, 'background-color', '#000033')

setInterval(
  () => changeColors($hero, '#0000ff', {primary: [], secondary: ['color']})(heroH++),
  250
);



// const ticker = tickerGenerator()
// setInterval(() => {
//   $currencyTicker.innerHTML = ticker.next().value
// }, 50)


// const tickerGen = getTicker()
// setInterval(() => {
//   console.log(tickerGen.next().value)
// }, 300)
