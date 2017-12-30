// @flow

import $ from 'utils/$';
import _ from 'utils/_';


// const signupTemplate = require('babel-loader!template-string!./signup.html');

const callToAction = $.id('call-to-action');
const signUpModal = $.id('signup-modal-container');
const signUpModalBackground = $.cls('signup-modal-background')[0];
const submission = $.id('signup-submission');
const signupForm = $.id('signup-form');
const signupLoading = $.id('signup-loading');
const signupOutput = $.id('signup-output');


const navHeight = '45px';
const modalHeight = `calc(100vh - ${navHeight}`;

$(signUpModal, 'height', modalHeight)
$(signUpModal, 'visibility', 'hidden')

// display modal when call to action is clicked
$.onClick(callToAction)(() => {
  setTimeout(
    () => {
      $(signUpModal, 'visibility', 'inherit')
      $(signUpModal, 'margin-top', '-75px')
    },
    300
  )
});


// Hide modal when clickin background
$.onClick(signUpModalBackground)(() => {

  $(signUpModal, 'margin-top', '100vh')

});


function *nextLoadingChar(str) {
  let i = 0;
  while (true) yield str[i++ % str.length];
}

function setLoadingAnimation() {
  $(signupForm, 'display', 'none');
  signupLoading.innerHTML = 'LOADING ';
  const loadingChars = nextLoadingChar('>>>>>>>$$$$$$$$+++++++');

  const loadingAnimation = setInterval(
    () => signupLoading.innerHTML += loadingChars.next().value,
    50
  );

  return () => {
    clearInterval(loadingAnimation);
    $(signupLoading, 'display', 'none');
  }
};

$.onClick(submission)(async () => {
  const clearLoadingAnimation = setLoadingAnimation();

  const something = await _.promise.wait(2000);

  clearLoadingAnimation();
});
