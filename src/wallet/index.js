// @flow

import './index.css';
import 'babel-polyfill'
import web3Setup, { getBuyData, getTransferData, executeTransfer, simpleBuy } from 'utils/web3Setup';
import $ from 'utils/$';
import _ from 'utils/_';
import {getQueryParams} from 'utils/getRef'
import { serif, sansSerif, warning as _warningIcon } from 'components/symbol'
const fcSymbol = sansSerif({ size: 10 }).outerHTML
_.each($.cls('fc-ss'), elem => elem.innerHTML = fcSymbol)

const routingCode = getQueryParams().routingCode || localStorage.getItem('routingCode') || null
localStorage.setItem('routingCode', routingCode)


let INSTANCE;
web3Setup()
  .then(i => INSTANCE = i)
  .catch(console.error)


const $refLinkLong  = $.id('refLinkLong')
const $refLinkShort  = $.id('refLinkShort')
const $refLongCopy  = $.id('refLongCopy')
const $refShortCopy  = $.id('refShortCopy')
const $emailShare  = $.id('emailShare')
const $twitterShare  = $.id('twitterShare')
const $transferAddressInput = $.id('transferAddressInput')
const $transferAmountInput = $.id('transferAmountInput')
const $transferData = $.id('transferData')
const $executeTransfer = $.id('executeTransfer')
const $executeBuy = $.id('executeBuy')
const $weiAmount = $.id('weiAmount')
const $amountToSendData = $.id('amountToSendData')

$refLinkLong.innerHTML = `https://fastcashmoneyplus.biz/?ref=${routingCode}`
$refLinkShort.innerHTML = `https://fast.plus?r=${routingCode}`

$refLongCopy.onclick = () => {
  $refLinkLong.select()
  document.execCommand('Copy')
  alert('Copied to clipboard!')
}
$refShortCopy.onclick = () => {
  $refLinkShort.select()
  document.execCommand('Copy')
  alert('Copied to clipboard!')
}

const emailBody = encodeURI(`
  Hello! I just came accross an INCREDIBLE investment opportunity,
  and wanted to share it with you before it really took off! If you're
  looking to get RICH QUICK, then this has your name written all over it!
  Simply visit this cryptographically SECURE link:
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  |
  |    https://fastcashmoneyplus.biz/?ref=${routingCode}
  |
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  and follow the instructions!
`)

const emailSubject = encodeURI('CHECK OUT THIS AMAZING INVESTMENT OPPORTUNITY!')
$emailShare.href = `mailto:?Subject=${emailSubject}&Body=${emailBody}`

const twitterStatus = _.sample([
  encodeURI(`Are you #CRAVING MASSIVE #CRYPTO RETURNS? Then check THIS one out: https://fast.plus?r=${routingCode} $fastcash #FASTCASH $crypto #CRYPTOBULL $eth $btc $xrp`).replace(/\#/g, '%23'),
  encodeURI(`Check out this website to make fast cash now! https://fast.plus?r=${routingCode} #FASTCASH $fastcash #CRYPTOCRACK #btc #eth`).replace('#', '%23')
])

$twitterShare.href = `https://twitter.com/home?status=${twitterStatus}`

function populateTransferData(address, amount) {
  $transferData.innerHTML = (address && amount)
    ? getTransferData(address, amount)
    : '';
}

let transferAddress;
let transferAmount;
$transferAddressInput.onchange = event => {
  transferAddress = event.target.value;
  populateTransferData(transferAddress, transferAmount)
}
$transferAmountInput.onchange = event => {
  transferAmount = event.target.valueAsNumber;
  populateTransferData(transferAddress, transferAmount)
}

$executeTransfer.onclick = () => {
  if (!INSTANCE) {
    alert('Please try again with an ethereum enabled browser or plugin (ex. MetaMask). Or, try executing your transfer from a wallet with the above data')
    return
  }

  if (!transferAddress || !transferAddress) {
    alert('Please fill out BOTH required fields for transfering FASTCASH')
    return
  }

  executeTransfer(INSTANCE, transferAddress, transferAmount)
}

let buyAmount;
$weiAmount.onchange = event => {
  buyAmount = event.target.valueAsNumber
  $amountToSendData.innerHTML = buyAmount
}

$executeBuy.onclick = () => {
  if (!INSTANCE) {
    alert('Please try again with an ethereum enabled browser or plugin (ex. MetaMask). Or, try executing your transfer from a wallet with the above data')
    return
  }

  if (!buyAmount) {
    alert('Please select an amount to BUY MORE FASTCASH')
    return
  }

  simpleBuy(buyAmount)
}
