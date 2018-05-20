import './index.css'
import smoothTo from 'utils/smoothTo'


var currencySymbols = [
  '$',
  '&#165',  // ¥
  '$',
  '&#163',  // £
  '$',
  '&#8364', // €
  '&#8373', // ₵
  '$',
  '&#8364', // €
  '&#165',  // ¥
  '$',
  '&#8361', // ₩
  '&#8364', // €
  '$',
  '&#163',  // £
  '&#8369', // ₱
  '&#165',  // ¥
  '&#8377', // ₹
  '$',
  '&#163',  // £
  '$',
  '&#165',  // ¥
  '&#8364', // €
  '&#3647', // ฿
  '$',
  '&#8363', // ₫
  '$',
  '&#165',  // ¥
  '&#8361', // ₩
  '&#3647', // ฿
  '&#8373', // ₵
  '&#8364', // €
  '&#8353', // ₡
  '$',
  '&#165',  // ¥
  '&#163',  // £
  '$',
  '&#8366', // ₮
  '&#8369', // ₱
  '$',
  '&#163',  // £
  '&#8367'  //₯
];

// TODO - Symbols?
// State Object
var CHANGE_SYMBOL = true;
var SWITCH_ACTIVE = false;
var FAST_ACTIVE = false;
var CHANGE_COLOR = true;
var BUTTON_HOVER = null;

var TEXT_CHANGE = 100;
var COLOR_CHANGE = 20;
var COLOR_SWITCH = 100;
var BUTTON_SWITCH = 2000;


var cash = document.getElementById('cash');
var body = document.getElementsByTagName('body')[0];
var background = document.getElementById('background');
var mainContainer = document.getElementById('main-container');

// TODO - generator
var len = currencySymbols.length;
function changeSymbol() {
  if (!CHANGE_SYMBOL) return;
  var i = Math.floor(Math.random() * len);
  cash.innerHTML = currencySymbols[i];
};

var textHSV = {h: 180, s: 1, v: 1};
var bodyHSV = {h: 0, s: 1, v: 1};
var backgroundTextHSV = {h: 120, s:1, v: 1};


function fast() {
  var symbol = currencySymbols[Math.floor(Math.random() * len)];
  var symbol2 = currencySymbols[Math.floor(Math.random() * len)];
  background.innerHTML += symbol + symbol2;
};


// function activateSwitchColor() { SWITCH_ACTIVE = !SWITCH_ACTIVE; };
// function activateChangeColor() { CHANGE_COLOR = !CHANGE_COLOR; };
// function activateFast() { FAST_ACTIVE = !FAST_ACTIVE; };
// function activateChangeSymbol() { CHANGE_SYMBOL = !CHANGE_SYMBOL;};

let audioCtx, gain, oscillator, currentInterval, soundMovement, gainNode, NOISE_PLAYING, FREQ_CHANGE;
let inited = false

function init() {
  if (inited) return;
  inited = true;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.04;
  gainNode.connect(audioCtx.destination);
  oscillator;
  currentInterval;
  soundMovement = 1

  NOISE_PLAYING = false;
  FREQ_CHANGE = COLOR_CHANGE;
}

var intervals = [];
function noiseInterval() {
  const freq = oscillator.frequency;
  let smoothFreq = smoothTo(freq, audioCtx)
  smoothFreq(10, 0.25)
  const freqChange = FREQ_CHANGE * 10

  currentInterval = setInterval(() => {
    if (freq.value >= 1020) {
      soundMovement = -10;
    } else if (freq.value <= 10) {
      soundMovement = 10;
    }
    smoothFreq(freq.value + soundMovement, freqChange)
    freq.value += soundMovement;
  }, freqChange);
  intervals.push(currentInterval);
}

var oscillators = [];
function startNoise() {
  init()
  NOISE_PLAYING = true;

  oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);

  oscillator.type = 'square';
  oscillator.detune.value = 100;
  oscillator.frequency.value = 8000;
  oscillator.start(0);
  setTimeout(noiseInterval, 100);
  oscillators.push(oscillator);
};

function endNoise() {
  NOISE_PLAYING = false;
  oscillators.forEach(function(osc) {
    osc.stop();  // not clearing sounds fucking awesome.
  });
  intervals.forEach(clearInterval);
};

function makeNoise() {
  // if (NOISE_PLAYING) { endNoise(); }
  // else { startNoise(); }
  startNoise();
}


let fastInterval
mainContainer.onclick = function() {
  if (fastInterval) {
    clearInterval(fastInterval)
    fastInterval = null;
  }
  else fastInterval = setInterval(fast, COLOR_CHANGE);
  makeNoise();
};

document.addEventListener("DOMContentLoaded", function() {
  setInterval(changeSymbol, TEXT_CHANGE);
  // setInterval(changeColor, COLOR_CHANGE);
});

// window.onkeydown = function(e){
//   if (e.keyCode === 32) { } // spacebar
//   // if (e.keyCode === 67) { activateSwitchColor(); } // c
//   if (e.keyCode === 86) { activateChangeColor(); } // v
//   if (e.keyCode === 78) { activateChangeSymbol(); } // n
//   if (e.keyCode === 77) { endNoise(); } // m
// };
