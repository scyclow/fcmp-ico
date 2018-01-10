// @flow

import $  from 'utils/$';
import _  from 'utils/_';
import playTone  from 'utils/playTone';
import { serif } from 'components/symbol'
const fcSymbol = serif({ size: 45 }).outerHTML

const floaters = $.cls('floater');


_.each(floaters, (floater, i) => {
  $(floater, 'font-size', 45);
  $(floater, 'animation', `ColorRotate ${_.random(3, 8)}s ease infinite`);
  floater.innerHTML = Math.random() < 0.5 ? fcSymbol : '$';

  const moveFloater = () => {
    if (window.IMPORTANT.pause) return;
    const moveX = _.random(0, $.window.width) + 'px';
    const moveY = _.random(0, $.window.height) + 'px';
    $(floater, 'margin-left', moveX);
    $(floater, 'margin-top', moveY);
  };

  moveFloater();
  const floating = setInterval(
    moveFloater,
    _.random(1000, 3000, true)
  );

  $.onClick(floater)(() => {
    console.log('clicked floater', i);
    playTone()
    $(floater, 'display', 'none');
    clearInterval(floating)
  });

});
