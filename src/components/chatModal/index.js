// @flow

import $ from 'utils/$';
import _ from 'utils/_';
import './index.css'
import chatTemplate from './index.html'

const parser = new DOMParser();
const parse = (template, id) => parser.parseFromString(template(), 'text/html').childNodes[0]

const $chatModal = parse(chatTemplate).querySelector('#chatModal')
const $chatInput = $chatModal.querySelector('#chatInput');
const $chatHistory = $chatModal.querySelector('#chatHistory');

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
  yield `That's great to hear! To continue, Im gong to need to verify your identity. Cna you please give me the last six digits of your social security number so i can verify your identity?`
  while (true) {
    console.error('ERROR PARSING SSN: NaNNaNNaNNaNNaNNaN')
    yield `ERROR PARSING SSN: NaNNaNNaNNaNNaNNaN -- please contact <a href="mailto:fastcashmoneyplus.biz@gmail.com" target="_blank">fastcashmoneyplus.biz@gmail.com</a> for further assistance`
  }
}
const chatResponder = chatResponse()
$chatHistory.innerHTML += chatLine('STEVE', chatResponder.next().value)

function newMessage(from_, msg) {
  $chatHistory.innerHTML += chatLine(from_, msg)
  $chatHistory.scrollTop = $chatHistory.scrollHeight;
}

$chatModal.querySelector('#chatModal-x').onclick = () => $($chatModal, 'display', 'none')
$chatInput.onkeypress = (e) => {
  if (e.key === 'Enter') {
    const msg = $chatInput.value;
    setTimeout(() => $chatInput.value = '', 50)
    newMessage('YOU', msg)

    setTimeout(() => {
      newMessage('STEVE', chatResponder.next(msg).value)
    }, _.random(200, 3000, true))
  }
}


export default $chatModal
