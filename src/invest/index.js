// @flow

import './invest.css';
import 'babel-polyfill'
import web3Setup, { getBuyData } from 'utils/web3Setup';
import $ from 'utils/$';
import _ from 'utils/_';
import warning from './warning.html';
import {createAddress} from 'utils/routingCodeGenerator'
import {getRef, getQueryParams} from 'utils/getRef'
import { serif, sansSerif, warning as _warningIcon } from 'components/symbol'
const fcSymbol = sansSerif({ size: 10 }).outerHTML
const fcSymbolLarge = sansSerif({ size: 18 }).outerHTML
const fcSerifLarge = serif({ size: 18, adjusted: true }).outerHTML
const warningIcon = _warningIcon().outerHTML
_.each($.cls('fc-ss'), elem => elem.innerHTML = fcSymbolLarge)


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



// TODO update
const weeksSinceStart = 0

const STATE = {
  referal: getRef() || '',
  newRoutingCode: '',
  amountInMoneyBucks: 0,
  fastcashLeft: 1000000,
  usd2fc: 4 / (1.2 ** weeksSinceStart),
  usd2eth: 1000000000000000 / (10 ** 18)
}

let INSTANCE;
const LOADING_TIME = 2500

const { noWarning } = getQueryParams()
if (noWarning) {
  setTimeout(() => $($step2, 'visibility', 'inherit'), 1000)
}
if (!noWarning) {
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

  // const LOADING_TIME = 0

  setTimeout(stopLoading, LOADING_TIME)
}



// WARNING
let displayWarning;
const warningDisplayed = noWarning
  ? Promise.resolve()
  : new Promise(res => displayWarning = res)

const warningElem = document.createElement('div')
warningElem.innerHTML = warning();

setTimeout(() => {
  if (!noWarning) {
    document.body.appendChild(warningElem)
    displayWarning()
    _.each($.cls('warningIcon'), elem => elem.innerHTML = warningIcon)
    _.each($.cls('closeWarning'), elem =>
      $.onClick(elem)(() => document.body.removeChild(warningElem))
    )
  }
}, LOADING_TIME - 100)


// ROUTING CODE BUTTON
const $gotoWallet = $.id('gotoWallet')
const emptyAddress = "0x0000000000000000000000000000000000000000";
let routingCodeTries = 0
const generateCode = async () => {
  // there should be some
  const proposedCode = createAddress();

  let existingCode
  if (INSTANCE) {
    existingCode = await INSTANCE.routingCodeMap.call(proposedCode)
  }


  let tries = 0
  if (!existingCode || existingCode === emptyAddress) {
    STATE.newRoutingCode = proposedCode;
    $gotoWallet.href = `./wallet.html?routingCode=${proposedCode}`
    const interval = setInterval(() => {
      $routingCode.innerHTML = createAddress()
    }, 30)

    setTimeout(() => {
      clearInterval(interval)
      $routingCode.innerHTML = '<strong>' + proposedCode + '</strong>';
      $($routingCode, 'border', '3px solid #ff8800')
      $($routingCode, 'background-color', '#ffddaa')
      setTimeout(() => $($step2, 'visibility', 'inherit'), 200)
    }, _.random(1800, 600, true))

    renderFromTransactionData(STATE)
  } else {
    if(routingCodeTries++ > 2) {return console.error('cannot generate routing code')}
    generateCode()
  }
}

// INVESTMENT
const $investmentContainer = $.id('investmentContainer');
const $tableContainer = $.id('tableContainer');
const $generateRoutingCode = $.id('generateRoutingCode');
const $routingCode = $.id('routingCode');
const $purchaseAmountSlider = $.id('purchaseAmountSlider')
const $amountOfFastcash = $.id('amountOfFastcash')
const $amountOfMoneybucks = $.id('amountOfMoneybucks')
const $pleaseContact = $.id('pleaseContact')
const $fastcashLeft = $.id('fastcashLeft')
const $fastcashChooser = $.id('fastcashChooser')
const $fastcashChooserErr = $.id('fastcashChooserErr')
const $stepsToComplete = $.id('stepsToComplete')
const $toAddressData = $.id('toAddressData')
const $amountToSendData = $.id('amountToSendData')
const $dataData = $.id('dataData')
const $easyCheckout = $.id('easyCheckout')
const $easyCheckoutMsg = $.id('easyCheckoutMsg')

const $step1 = $.id('step1')
const $step2 = $.id('step2')
const $step3 = $.id('step3')
const $step4 = $.id('step4')
const $step5 = $.id('step5')
const $complete = $.id('complete')
const $ethBought = $.id('ethBought')
const $ethInWallet = $.id('ethInWallet')

$ethBought.onchange = event => {
  if (event.target.checked) {
    $($step4, 'visibility', 'inherit')
  } else {
    $($step4, 'visibility', 'hidden')
  }
}

$ethInWallet.onchange = event => {
  if (event.target.checked) {
    $($step5, 'visibility', 'inherit')
    $($complete, 'visibility', 'inherit')
  } else {
    $($step5, 'visibility', 'hidden')
    $($complete, 'visibility', 'hidden')
  }
}


function renderPage({ fastcashLeft, referal, usd2fc, usd2eth, amountInMoneyBucks, newRoutingCode }) {
  $fastcashLeft.innerHTML = `THERE IS CURRENTLY ${fcSerifLarge}${fastcashLeft} LEFT IN THE FASTCASH BANK! (week ${weeksSinceStart})`
  $($investmentContainer, 'visibility', 'visible');
  const fc2usd = 1/usd2fc;
  const eth2usd = 1/usd2eth;
  const fc2eth = fc2usd * usd2eth;
  const eth2fc = 1/fc2eth;


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

  $generateRoutingCode.onclick = generateCode


  // CHOOSE FASTCASH

  $amountOfFastcash.innerHTML = sansSerif({ size: 18 }).outerHTML + '0';

  const chooserErr = () => {
    $($fastcashChooser, 'border', '3px solid red')
    $fastcashChooserErr.innerHTML = 'This is an invalid amount of fastcash'
  }
  chooserErr()

  const changeAmount = (amt: number) => {
    const amountInMoneyBucks = amt * (10 ** 18);
    STATE.amountInMoneyBucks = amountInMoneyBucks
    $pleaseContact.innerHTML = amt === fastcashLeft
      ? 'Please contact a FastCashMoneyPlus.biz representative'
      : ''
    renderFromTransactionData(STATE)

    $($step3, 'visibility', 'inherit')

    if (!amt) {
      chooserErr()
    } else {
      $($fastcashChooser, 'border', '0')
      $fastcashChooserErr.innerHTML = ''
    }
    $amountOfMoneybucks.innerHTML = `
      <table>
        <tr>
          <td>USD</td><td>$${(amt * fc2usd).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Ethereum</td><td>&#x39E;${amt * fc2eth}</td>
        </tr>
        <tr>
          <td>MoneyBucks</td><td>${amountInMoneyBucks}</td>
        </tr>
        <tr>
          <td>WEI</td><td>${Math.round(amt * fc2eth * (10 ** 18))}</td>
        </tr>
      </table>
    `
    // do stuff with sound
  }

  const expFactor = 5;
  const convertToFc = (amt) => {
    return ((amt ** expFactor) / (10 ** (expFactor + 9))) * (fastcashLeft / 1000000)
  }
  const convertFromFc = (amt) => {
    return ((amt * (10 ** (expFactor + 9))) ** (1/expFactor))
  }


  $purchaseAmountSlider.oninput = event => {
    const value = convertToFc(event.target.valueAsNumber);
    changeAmount(value)
    $amountOfFastcash.value =  value;
  }

  $amountOfFastcash.onchange = event => {
    const value = Number(event.target.value)
    changeAmount(value)
    $purchaseAmountSlider.value = convertFromFc(value)
  }

  $easyCheckout.onclick = event => {
    console.log('click')
    if (!INSTANCE) {
      alert('PLEASE VISIT THIS PAGE USING METAMASK OR AN ETHEREUM-BASED BROWSER. OR, CHECKOUT USING MYETHERWALLET, OUTLINED IN THE STEPS ABOVE')
      return
    }

    if (!STATE.newRoutingCode) {
      alert('PLEASE GENERATE A FASTCASH ADDRESS AND TRY AGAIN')
      return
    }

    if (!STATE.amountInMoneyBucks) {
      alert('PLEASE CHOOSE THE AMOUNT OF FASTCASH YOU WOULD LIKE TO INVEST IN AND TRY AGAIN')
      return
    }

    const amountInWei = STATE.amountInMoneyBucks * fc2eth;
    $easyCheckoutMsg.innerHTML = 'YOUR TRANSACTION IS PENDING. PLEASE WAIT FOR THE TRANSACTION TO FINISH PROCESSING. THANK YOU'
    INSTANCE.buy(
      STATE.newRoutingCode,
      STATE.referal,
      { from: web3.eth.coinbase, value: amountInWei, gas: 150000, gasPrice: 40 * (10 ** 9) }
    )
    .then((r) => {
      window.alert('SUCCESS! Here is your receipt: '+ JSON.stringify(r))
      $easyCheckoutMsg.innerHTML = 'SUCCESS'
    })
    .catch(e => {
      console.error(e)
      $easyCheckoutMsg.innerHTML = 'SOMETHING WENT WRONG: e'
      window.alert('ERROR:'+e.message)
    })
  }

  renderFromTransactionData(STATE)
}

function renderFromTransactionData({ usd2fc, usd2eth, amountInMoneyBucks, newRoutingCode, referal }) {
  const fc2usd = 1/usd2fc;
  const eth2usd = 1/usd2eth;
  const fc2eth = fc2usd * usd2eth;

  let leftToDo = 'Please do the following things before continuing: '
  if (!amountInMoneyBucks) leftToDo += '<br>1. Choose the amount of fastcash you\'d like to buy'
  if (!newRoutingCode) leftToDo += '<br>2. Generate a fastcash address'
  if (amountInMoneyBucks && newRoutingCode) leftToDo = `ALMOST THERE! <h3 class="sansSerif">PLEASE NOTE THAT ALL TRANSACTIONS ARE NON-REFUNDABLE, AND THAT BY PURCHASING FASTCASH, YOU WAIVE ALL FUTURE LIABILITIES RELATING TO FASTCASHMONEYPLUS.biz</h3>`

  $stepsToComplete.innerHTML = leftToDo;

  const amountInWei = amountInMoneyBucks * fc2eth;
  if (amountInWei) {
    $amountToSendData.innerHTML = amountInWei / (10 ** 18);
  }

  if (newRoutingCode && amountInWei) {
    const buyData = getBuyData(newRoutingCode, referal, amountInWei)
    // TODO -- hardcode as actual address
    $toAddressData.innerHTML = ''
    $dataData.innerHTML = buyData
  }
}

warningDisplayed.then(() => {
  renderPage(STATE)
})

Promise.all([
  web3Setup(),
  warningDisplayed
])
  .then(async _instance => {
    INSTANCE = _instance[0];
    STATE.fastcashLeft = (await INSTANCE.balanceOf(await INSTANCE.centralBanker())).toNumber() / (10 ** 18)
    STATE.usd2fc = (await INSTANCE.getCurrentExchangeRate.call()).toNumber() / (10 ** 18)
    STATE.usd2eth = (await INSTANCE.USDWEI.call()).toNumber() / (10 ** 18);
    renderPage(STATE)
  })
  .catch(e => {
    console.error(e);
    return warningDisplayed;
  })
  .then(() => {
    renderPage(STATE)
  })

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
