// @flow

import './index.css';
import 'babel-polyfill'
import web3Setup, { CONTRACT_ADDRESS, getBuyData, getTransferData, executeTransfer, simpleBuy, fromUtf8 } from 'utils/web3Setup';
import $ from 'utils/$';
import _ from 'utils/_';
import {getQueryParams} from 'utils/getRef'
import { serif, sansSerif, warning as _warningIcon } from 'components/symbol'
const fcSymbol = sansSerif({ size: 10 }).outerHTML
_.each($.cls('fc-ss'), elem => elem.innerHTML = fcSymbol)

const routingCode = localStorage.getItem('routingCode') || null
localStorage.setItem('routingCode', routingCode)


let INSTANCE;
web3Setup()
  .then(i => INSTANCE = i)
  .then(renderFromInstance)
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
const $accountBalance = $.id('accountBalance')
const $toAddressData1 = $.id('toAddressData1')
const $toAddressData2 = $.id('toAddressData2')

$toAddressData1.innerHTML = CONTRACT_ADDRESS;
$toAddressData2.innerHTML = CONTRACT_ADDRESS;

$refLinkLong.innerHTML = `http://fastcashmoneyplus.biz/?ref=${routingCode}`
$refLinkShort.innerHTML = `http://fast.plus?r=${routingCode}`

$refLongCopy.onclick = () => {
  const x = document.createElement('input')
  x.value = $refLinkLong.innerHTML
  x.select()
  document.execCommand('Copy')
  alert('Copied to clipboard!')
}
$refShortCopy.onclick = () => {
  const x = document.createElement('input')
  x.value = $refLinkShort.innerHTML
  x.select()
  document.execCommand('Copy')
  alert('Copied to clipboard!')
}

const emailBody = encodeURI(`
  Hello! I jsut came accross an INCREDIBLE investment opportunity,
  and wanted to share it with you before it really took off! If your
  looking to get RICH QUICK, then this has your name written all over it!
  Simply visit this cryptographicaly SECURE link:
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  |
  |    http://fastcashmoneyplus.biz/?ref=${routingCode}
  |
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  and follow the instructions!
`)

const emailSubject = encodeURI('CHECK OUT THIS AMAZING INVESTMENT OPPORTUNITY!')
$emailShare.href = `mailto:?Subject=${emailSubject}&Body=${emailBody}`

const twitterStatus = _.sample([
  encodeURI(`Are you #CRAVING MASSIVE #CRYPTO RETURNS? Then check THIS one out: http://fast.plus?r=${routingCode} $fastcash #FASTCASH $crypto #CRYPTOBULL $eth $btc $xrp`).replace(/\#/g, '%23'),
  encodeURI(`Check out this website to make fast cash now! http://fast.plus?r=${routingCode} #FASTCASH $fastcash #CRYPTOCRACK #btc #eth`).replace('#', '%23'),
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

function renderFromInstance(i) {
  i.balanceOfRoutingCode.call(fromUtf8(routingCode))
    .then(n => n.toNumber())
    .then(balance => {
      $accountBalance.innerHTML = `<h1>YOU HAVE ${balance/(10**18)} FastCash! (${balance} MoneyBucks)</h1>`
    })
}

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
    `%cPlease close this tab and report the incident to a FastCashMoneyPlus representative!: fastcashmoneyplus.biz@gmail.com`,
    'font-size: 19px;'
  )
}, 2000)
