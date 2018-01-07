import './index.css';
import 'babel-polyfill'
import $ from 'utils/$';
import {tickerGenerator} from 'utils/randCurrency'

const $currencyTicker = $.id('currencyTicker');

const ticker = tickerGenerator()
setInterval(() => {
  $currencyTicker.innerHTML = ticker.next().value
}, 50)
