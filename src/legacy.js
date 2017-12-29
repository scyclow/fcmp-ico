
import $  from 'utils/$';
import _  from 'utils/_';
import 'components/signup';
import 'components/floater';


const c = require('./utils/colors');
const { updateColorSpeedDistance, changeColors } = require('./utils/updateColor');


const colorSwitchers = $.cls('color-speed-distance');
const colorMouses = $.cls('color-distance');
const shadowChanges = $.cls('shadow-change');
const colorTimeChangers = $.cls('color-time-change');

const baseSpeed = { distance: 600, time: 1 };

const baseShadowRadius = 20;
const orientAdjust = 10;

const updateBoxShadow = box => ({ coords }) => {
  const center = $.center(box);
  const distance = _.distance(coords, center);
  const degree = _.degreeAroundCenter(coords, center);

  const shadowColor = c.applyToHex('#500', {
    h: _.round(degree),
    v: _.atMost(0.5)(distance / 800),
  });

  const shadowRadius = baseShadowRadius * (distance / 350) + baseShadowRadius;
  const x = _.round(shadowRadius * _.sin(degree));
  const y = _.round(shadowRadius * _.cos(degree));

  const boxShadowStyle = `${y}px ${x}px ${baseShadowRadius}px ${shadowColor}`;

  $(box, 'box-shadow', boxShadowStyle);
};

// change box shadow when device orientation changes
// beta -- forward backward tilt. 0 when flat on back, negative when backwards, converges at +/- 180 when flat upside down
// alpha -- direction. roughly 360/0 when facing north
// gamma -- side to side tilt. 0 when flat on either side. negative when left, postive when right (facing both sides), converges at 90
const clearOrients = shadowChanges.map(box => {
  const update = updateBoxShadow(box);

  return $.onOrient(({ beta, gamma, absolute, alpha }) => {
    const coords = {
      x: ((gamma < 0) ? (90 + gamma) : (90 - gamma)) * orientAdjust,
      y: (90 - beta) * orientAdjust
    };

    update({ coords });
  })
});

// remove orientation effects when there is a mouse event
$.onMouseMove()(() => clearOrients.forEach(_.runFn));

type ColorUpdator = {
  updateColorSpeed: Function,
  updateCenter: Function
};

const updaters: Array<ColorUpdator> = colorSwitchers.map(box =>
  updateColorSpeedDistance(box, c.applyToHex('#ff0000', { h: _.random(360) }), baseSpeed, {
    primary: ['background-color'],
    secondary: ['color']
  })
);

// update color speed of element based on distace from mouse
$.onMouseMove()((event) => {
  updaters.map(updater => updater.updateColorSpeed(event))
});


// FIXME (onResize) -- update center of element on window resize
// $.onResize()(() => updaters.forEach(({ updateCenter }) => updateCenter()));

// change shadow angle and color depending mouse position relative to center of element
$.onMouseMove()(event => shadowChanges.map(box => updateBoxShadow(box)(event)));

// continuously rotate element color
colorTimeChangers.forEach(elem => {
  let h = 1
  setInterval(() => changeColors(elem, '#ff0000')(h++), 20);
});

const baseButtonColor = c.polarize('#ff0000');

// Color changes as mouse gets closer to center of element; polarizes on hover
colorMouses.forEach(elem => {
  // random color when there is no initial mouse
  changeColors(elem, baseButtonColor)(_.random(360));

  let isHovering;

  $.onHover(elem)(
    enterEvent => isHovering = true,
    leaveEvent => isHovering = false
  );

  $.onMouseMove()(event => {
    const dist = $.distanceFromCenter(elem, event);
    const hue = _.round(dist / 3);
    const adj = isHovering ? 180 : 0;
    changeColors(elem, baseButtonColor)(hue + adj)
  })
});
