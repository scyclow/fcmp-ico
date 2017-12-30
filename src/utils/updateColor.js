// @flow weak

'use strict';

const _ = require('./_');
const $ = require('./$');
const c = require('./colors');
const dynamicInterval = require('./dynamicInterval');
const atLeast1 = _.atLeast(1);

type HSV = {
  h?: number,
  s?: number,
  v?: number,
};

const changeColors = (elem: Element, baseColor: string, properties={}) => {
  let primaryColor = baseColor;
  let secondaryColor = c.polarize(primaryColor);

  properties.primary = properties.primary || ['background-color'];
  properties.secondary = properties.secondary || ['color', 'fill'];

  return (input: number | HSV) => {
    const hsv = {
      h: typeof input === 'number' ? input : input.h,
      s: typeof input === 'number' ? undefined : input.s,
      v: typeof input === 'number' ? undefined : input.v
    }

    if (!window.IMPORTANT.pause) {
      primaryColor = c.applyToHex(primaryColor, hsv);
      secondaryColor = c.polarize(primaryColor);

      properties.primary.forEach(p => $(elem, p, primaryColor))
      properties.secondary.forEach(s => $(elem, s, secondaryColor))
    }
  }
}

const maxChange = 10;
const baseDistance = 700;
const baseTime = 15;

const defaultOptions = { factor: 1.5, primary: undefined, secondary: undefined };

function createSpeedSetter (elem, baseColor, { primary, secondary, factor=1.5 } = defaultOptions) {
  const { set, clear } = dynamicInterval(changeColors(elem, baseColor, { primary, secondary }));

  return (rawDistance) => {
    const distance = atLeast1(rawDistance);
    const distProportion = distance / baseDistance;

    let time = _.atLeast(baseTime)(
      _.round(baseTime * distProportion * factor)
    );

    const colorChange = _.round(atLeast1(
      -(maxChange) * (1 - distProportion ** -0.1 )
    ));
  // set(100,100) //<- interesting behavior
    set(time, colorChange, [time, colorChange]);
  }
}



// create interface to update color speed and element center
type ColorSpeedUpdater = {
  updateColorSpeed: (coordinates: { coords: { x: number, y: number } }) => void,
  updateCenter: () => void
};

function updateColorSpeedDistance(
  elem: Element,
  baseColor: string,
  baseSpeed: { distance: number, time: number}
): ColorSpeedUpdater {
  let elemCenter = $.center(elem);
  const setSpeed = createSpeedSetter(elem, baseColor);
  setSpeed(baseSpeed.distance, baseSpeed.time);

  return {
    updateColorSpeed({coords}) {
      const distance = _.distance(coords, elemCenter);
      setSpeed(distance);
    },

    updateCenter() {
      elemCenter = $.center(elem)
    }
  }
}

module.exports = { updateColorSpeedDistance, changeColors };
