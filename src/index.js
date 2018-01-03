// @flow

import 'index.css';
import 'babel-polyfill'
import './utils/devConsole'
import './legacy'
import {getRef} from 'utils/getRef'
import _ from 'utils/_'
import $ from 'utils/$'
import { polarize, applyToHex } from 'utils/colors';
import { serif, sansSerif } from 'components/symbol'
import {modal} from 'components/signupModal'


const fcSans = sansSerif({ size: 70, }).outerHTML
const fcSerif = serif({ size: 90 }).outerHTML

const { changeColors } = require('./utils/updateColor');


const referral = getRef()

const $faqQuestions = $.cls('faqQuestion')
const $navMenu = $.id('nav-menu');
const $content = $.id('content');
const $hero = $.id('hero');
const $warning = $.id('warning');
const $callToAction = $.id('call-to-action');
_.each($.cls('fc-ss'), elem => elem.innerHTML = fcSerif)
_.each($.cls('fc-s'), elem => elem.innerHTML = fcSans)

$content.appendChild(modal($callToAction))

const ctaPrompts = [
  'START NOW',
  'GET IT NOW',
  'CLICK HERE',
  '100% ONLINE',
  'MAKE CASH FAST',
  'MAKE FAST CASH',
  'SAFE AND SECURE',
  'FUEL YOUR DREAMS',
]

$callToAction.innerHTML = _.sample(ctaPrompts)
setInterval(() => $callToAction.innerHTML = _.sample(ctaPrompts), 2000)


let borderH = 1
setInterval(
  () => {
    changeColors($content, '#ff0000', {primary: ['border-color'], secondary: []})(borderH)
    changeColors($navMenu, '#ff0000', {primary: ['border-color'], secondary: []})(borderH)
    _.each($faqQuestions, q => changeColors(q, '#ff0000', {primary: ['border-color'], secondary: []})(borderH))
    borderH++
  },
  20
);


let heroH = 1;
setInterval(
  () => changeColors($hero, '#0000ff', {primary: [], secondary: ['color', 'fill']})(heroH++),
  250
);
