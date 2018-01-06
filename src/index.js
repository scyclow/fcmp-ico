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
const $ctaContent = $.id('cta-content');
const $menuStart = $.id('menuStart');
const $faqCTA = $.id('faqCTA');
const $popup = document.createElement('div')
const $popup2 = document.createElement('div')
_.each($.cls('fc-ss'), elem => elem.innerHTML = fcSerif)
_.each($.cls('fc-s'), elem => elem.innerHTML = fcSans)

$content.appendChild(modal($callToAction, $menuStart, $faqCTA, $popup, $popup2))

const ctaPrompts = [
  'START NOW',
  'GET IT NOW',
  'CLICK HERE',
  'CLICK HERE',
  'CLICK HERE',
  '100% ONLINE',
  'MAKE CASH FAST',
  'MAKE FAST CASH',
  'SAFE AND SECURE',
  'FUEL YOUR DREAMS',
]

$ctaContent.innerHTML = _.sample(ctaPrompts)
setInterval(() => $ctaContent.innerHTML = _.sample(ctaPrompts), 2000)


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

$popup.setAttribute('class', 'popup')
$popup2.setAttribute('class', 'popup')
$popup.innerHTML = `
  <div>X</div>
  <div class="popupContent">
    CLICK HERE TO GET STARTED WITH FASTCASHMONEYPLUS
    NOW!! DON'T WAIT THIS WON'T LAST!
  </div>
`

$popup2.innerHTML = `
  <div>X</div>
  <div class="popupContent">
    STOP WAITING FOR WEALTH TO FIND YOU! FIND YOUR WEALTH TODAY!
  </div>
`
$popup.onclick = () => setTimeout(() => $popup.remove(), 150)
$popup2.onclick = () => setTimeout(() => $popup2.remove(), 150)
$($popup2, 'margin-top', '130px')
$($popup2, 'margin-left', '50px')
$($popup2, 'width', '220px')
$($popup2, 'height', '190px')

setTimeout(() => {
  document.body.appendChild($popup)
  console.log('bl')
  setTimeout(() => {
    console.log('blewlwkel')
    document.body.appendChild($popup2)
  }, _.random(300, 5000, true))
// }, 2000)
}, _.random(2000, 30000, true))

setTimeout(() => {
  console.log(
    `%cSTOP! This is a private web browser feature intended for developers!`,
    'font-size: 25px; color: #f00'
  )
  console.log(
    `%cIf someone told you to paste something in here to "HACK" FastCashMoneyPlus, they are LYING to you, and just want to STEAL YOUR FASTCASH.`,
    'font-size: 20px;'
  )

  console.log(
    `%cPlease close this tab and report the incident to a FastCashMoneyPlus representative! https://github.com/scyclow/fcmp-ico/issues`,
    'font-size: 19px;'
  )
}, 2000)
