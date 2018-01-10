import './index.css';
import 'babel-polyfill'
import $ from 'utils/$';
import {tickerGenerator} from 'utils/randCurrency'

const $currencyTickers = $.cls('currencyTicker');

$currencyTickers.forEach(currencyTicker => {
  const ticker = tickerGenerator()
  setInterval(() => {
    currencyTicker.innerHTML = ticker.next().value
  }, 50)
})

// set tone to 20

try {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  const MAX_VOLUME = 0.02

  const source = ctx.createOscillator();
  const gain = ctx.createGain();

  source.connect(gain)
  gain.connect(ctx.destination)
  gain.gain.value = MAX_VOLUME
  source.type = 'sawtooth'
  source.detune.value = 100
  source.frequency.value = 30
  source.start()


  const ctx2 = new AudioContext();

  const source2 = ctx2.createOscillator();
  const gain2 = ctx2.createGain();

  source2.connect(gain2)
  source2.type = 'square'
  gain2.connect(ctx2.destination)
  gain2.gain.value = MAX_VOLUME
  source2.frequency.value = 4000
  source2.start()
} catch (e) {
  console.log(e)
}
