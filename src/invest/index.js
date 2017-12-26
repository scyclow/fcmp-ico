// @flow

/*
  TODO
    - A lot of this won't work without metamask
    - maybe set up a proxy web service that can hit the blockchain

    - create some render function
    - check for web3
    - if web3, get data, set state, and render
    - if no web3, hit proxy, set state, and render

*/


import './invest.css';
import web3Setup from 'utils/web3Setup';
import $ from 'utils/$';
import _ from 'utils/_';
import { serif, sansSerif } from 'components/symbol'
import {createAddress} from 'utils/routingCodeGenerator'

// audio stuff
const AudioContext = window.AudioContext || window.webkitAudioContext;
const MAX_VOLUME = 0.04

function createSource(srcType?: string = 'sine') {
  const ctx = new AudioContext();

  const source = ctx.createOscillator();
  const gain = ctx.createGain();

  source.connect(gain)
  gain.connect(ctx.destination)

  // window.gain = gain
  gain.gain.value = MAX_VOLUME
  source.type = srcType
  source.start()
  return {source, gain};
}




const STATE = {
  referal: null,
  newRoutingCode: '',
  amountInMoneyBucks: 0
}

_.each($.cls('fc-ss'), elem => elem.innerHTML = sansSerif({ size: 18 }).outerHTML)

// LOADING
const $loadingContainer = $.id('loadingContainer')
$loadingContainer.innerHTML = '<h1>LOADING INVESTMENT CONSOLE...</h1>'
let showSerif = true;
const loader = setInterval(() => {
  $loadingContainer.appendChild(showSerif ? serif() : sansSerif())

  showSerif = !showSerif;
}, 50)

const stopLoading = () => {
  clearInterval(loader)
  $($loadingContainer, 'display', 'none');
}

// setTimeout(stopLoading, 0)
setTimeout(stopLoading, 5000)


// INVESTMENT
const $investmentContainer = $.id('investmentContainer');
const $tableContainer = $.id('tableContainer');
$($investmentContainer, 'visibility', 'hidden');

web3Setup().then(async instance => {
  const fastcashLeft = (await instance.balanceOf(await instance.centralBanker())).toNumber() / (10 ** 18)
  $($investmentContainer, 'visibility', 'visible');
  const usd2fc = (await instance.getCurrentExchangeRate.call()).toNumber() / (10 ** 18);
  const fc2usd = 1/usd2fc;
  const usd2eth = (await instance.USDWEI.call()).toNumber() / (10 ** 18);
  const eth2usd = 1/usd2eth;
  const fc2eth = fc2usd * usd2eth;
  const eth2fc = 1/fc2eth;

  const fcSymbol = sansSerif({ size: 10 }).outerHTML

  const conversionTable = `
    <table>
      <thead>
        <tr><th>BASE CURRENCY</th><th>EQUALS</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>$1 (USD)</td><td>${fcSymbol}${usd2fc} (FASTCASH)</td>
        </tr>
        <tr>
          <td>${fcSymbol}1 (FASTCASH)</td><td>$${fc2usd} (USD)</td>
        </tr>
        <tr>
          <td>$1 (USD)</td><td>&#x39E;${usd2eth} (ETH)</td>
        </tr>
        <tr>
          <td>&#x39E;1 (ETH)</td><td>$${eth2usd} (USD)</td>
        </tr>
        <tr>
          <td>${fcSymbol}1 (FASTCASH)</td><td>&#x39E;${fc2eth} (ETH)</td>
        </tr>
        <tr>
          <td>&#x39E;1 (ETH)</td><td>${fcSymbol}${eth2fc} (FASTCASH)</td>
        </tr>
        <tr>
          <td>${fcSymbol}1 (FASTCASH)</td><td> 1000000000000000000 MONEYBUCKS</td>
        </tr>
      </tbody>
    </table>
  `
  $tableContainer.innerHTML = conversionTable


  // ROUTING CODE BUTTON
  const $generateRoutingCode = $.id('generateRoutingCode');
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  let routingCodeTries = 0
  const generateCode = async () => {
    // there should be some
    const proposedCode = createAddress();
    const existingCode = await instance.routingCodeMap.call(proposedCode)

    if (existingCode === emptyAddress) {
      STATE.newRoutingCode = proposedCode;
      $.id('routingCode').value = proposedCode
    } else {
      if(proposedCode++ > 2) {return console.error('cannot generate routing code')}
      generateCode()
    }
  }
  $.onClick($generateRoutingCode)(generateCode)


  // CHOOSE FASTCASH


  const $purchaseAmountSlider = $.id('purchaseAmountSlider')
  const $amountOfFastcash = $.id('amountOfFastcash')
  const $amountOfMoneybucks = $.id('amountOfMoneybucks')
  const $pleaseContact = $.id('pleaseContact')
  $amountOfFastcash.innerHTML = sansSerif({ size: 18 }).outerHTML + '0';

  const changeAmount = (amt: number) => {
    const amountInMoneyBucks = amt * (10 ** 18);
    STATE.amountInMoneyBucks = amountInMoneyBucks
    $pleaseContact.innerHTML = amt === fastcashLeft
      ? 'Please contact a FastCashMoneyPlus.biz representative'
      : ''
    $amountOfMoneybucks.innerHTML = `(${amountInMoneyBucks} MoneyBucks, $${(amt * fc2usd).toFixed(2)}(usd), &#x39E;${amt * fc2eth}(eth) )`
    // do stuff with sound
  }

  const expFactor = 5;
  const convertToFc = (amt) => {
    return ((amt ** expFactor) / (10 ** (expFactor + 9))) * (fastcashLeft / 1000000)
  }
  const convertFromFc = (amt) => {
    return ((amt * (10 ** (expFactor + 9))) ** (1/expFactor))
  }


  $purchaseAmountSlider.addEventListener('input', (event) => {
    const value = convertToFc(event.target.valueAsNumber);
    changeAmount(value)
    $amountOfFastcash.value =  value;
  })

  $amountOfFastcash.addEventListener('change', (event) => {
    const value = Number(event.target.value)
    changeAmount(value)
    $purchaseAmountSlider.value = convertFromFc(value)
  })
})
