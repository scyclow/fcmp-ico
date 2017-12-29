// @flow

import $  from 'utils/$';
import _  from 'utils/_';

const floaters = $.cls('floater');

_.each(floaters, (floater, i) => {
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
    console.log('clicked floader', i);
    $(floater, 'display', 'none');
    clearInterval(floating)
  });

});
