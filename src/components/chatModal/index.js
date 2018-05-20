// @flow

import $ from 'utils/$';
import _ from 'utils/_';
import './index.css'
import chatTemplate from './index.html'
import smoothTo from 'utils/smoothTo'


const parser = new DOMParser();
const parse = (template, id) => parser.parseFromString(template(), 'text/html').childNodes[0]

const $chatModal = parse(chatTemplate).querySelector('#chatModal')
const $chatInput = $chatModal.querySelector('#chatInput');
const $chatHistory = $chatModal.querySelector('#chatHistory');

const MAX_VOLUME = 0.03
let gain, source, smoothFreq;

let inited = false;
function init() {
  if (inited) return;
  inited = true;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    source = ctx.createOscillator();
    gain = ctx.createGain();

    source.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.value = 0
    smoothFreq = smoothTo(source.frequency, ctx)
    source.start()

  } catch (e) {
    console.log(e)
  }
}

const chatLine = (_from, content) => `
  <div class="chatLine">
    <span class="chatFrom">${_from} SAID: </span>${content}
  </div>
`

function *chatResponse() {
  const name = yield 'Hello and welcome to the FastCashMoneyPlus.biz investment console!. Who am i speaking with today?'
  yield `Hello ${name}, how can i assist you today??`
  yield `Yes, it's true! FastCashMoneyPlus.biz is the premier digital wealth platform on the internet today. People from all around the globe are accumulating wealth at previously unimaginable rates all thanks to FastCashMoneyPlus.biz. Does that answer your question???`
  yield `I see... do you need some help getting started?`
  yield `That's great to hear! To continue, Im gong to need to verify your identity. Cna you please give me your secret pin so i can verify your identity?`
  yield `I'm glad I could help you today! If you need any more assistance, please contact <a href="mailto:fastcashmoneyplus.biz@gmail.com" target="_blank">fastcashmoneyplus.biz@gmail.com</a> for further assistance`
  while (true) {
    yield
  }
}
const chatResponder = chatResponse()
$chatHistory.innerHTML += chatLine('STEVE', chatResponder.next().value)

function newMessage(from_, msg) {
  $chatHistory.innerHTML += chatLine(from_, msg)
  $chatHistory.scrollTop = $chatHistory.scrollHeight;
}

function playTone(freq) {
  init()
  smoothFreq(freq, 0.25);
  gain.gain.value = MAX_VOLUME;
  setTimeout(() => gain.gain.value = 0, 250)
}

$chatModal.querySelector('#chatModal-x').onclick = () => {
  playTone(500)
  $($chatModal, 'display', 'none')
}
$chatInput.onkeypress = (e) => {
  if (e.key === 'Enter') {
    const msg = $chatInput.value;
    setTimeout(() => $chatInput.value = '', 50)
    newMessage('YOU', msg)
    playTone(2000)

    setTimeout(() => {
      playTone(1000)
      newMessage('STEVE', chatResponder.next(msg).value)
    }, _.random(250, 3000, true))
  }
}


export default $chatModal
