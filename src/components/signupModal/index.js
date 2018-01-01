// @flow

import $ from 'utils/$';
import _ from 'utils/_';

import './index.css'
import modalTemplate from './index.html'
import step1Template from './step1.html'
import step2Template from './step2.html'
import step3Template from './step3.html'
import step4Template from './step4.html'
import loadingTemplate from './loading.html'

const parser = new DOMParser();
const parse = (template, id) => parser.parseFromString(template(), 'text/html').childNodes[0]

const mount = (elem, child) => {
  elem.innerHTML = '';
  elem.appendChild(child)
}

function *nextLoadingChar(str) {
  let i = 0;
  while (true) yield str[i++ % str.length];
}

export const modal = (trigger) => {
  const loading = parse(loadingTemplate).querySelector('#signupModal-loading')
  const step1 = parse(step1Template).querySelector('#signupModal-1')
  const step2 = parse(step2Template).querySelector('#signupModal-2')
  const step3 = parse(step3Template).querySelector('#signupModal-3')
  const step4 = parse(step4Template).querySelector('#signupModal-4')
  const loadingChars = nextLoadingChar('>>>>>>>$$$$$$$$+++++++');

  const component = parse(modalTemplate).querySelector('#signupModal');
  component.className = 'modalHidden'

  const bg = component.querySelector('#signupModalBG')
  const content = component.querySelector('#signupModalContent')

  bg.addEventListener('click', () => {
    setTimeout(() => {
      window.IMPORTANT.pause = false
      component.className = 'modalHidden'
    }, 50)
  })

  trigger.addEventListener('click', () => {
    console.log('bleh')
    // window.IMPORTANT.pause = true
    setTimeout(() => {
      component.className = '';
    }, 300)
  })

  mount(content, step1)

  step1.querySelector('#signupContinue-1').onclick = () => {
    mount(content, loading)
    setInterval(() => loading.innerHTML += loadingChars.next().value, 50)
    setTimeout(() => mount(content, step2), 7000)
  }

  step2.querySelector('#signupContinue-2').onclick = () => {
    mount(content, loading)
    setTimeout(() => mount(content, step3), 4000)
  }

  const continueIfInputsClicked = () => {
    const allClicked = [].every.call(step3.getElementsByTagName('input'), input => input.checked)

    if (allClicked) {
      mount(content, loading)
      setTimeout(() => mount(content, step4), 2000)
    }

  }
  _.each(step3.getElementsByTagName('input'), input => {
    input.onclick = continueIfInputsClicked
  })

  return component;
}
