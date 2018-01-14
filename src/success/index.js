// @flow

import $ from 'utils/$';
import _ from 'utils/_';
import createSource from 'utils/createSource';
import { getQueryParams } from 'utils/getRef'
import './index.css';

const smoothTo = (obj, ctx) => (value, timeInSeconds) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}

const startingFreq = 2000;
const MAX_VOLUME = 0.02;
const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001, 'square')
const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001, 'square')
const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001, 'square')


const smoothGain1 = smoothTo(gain1.gain, ctx1)
const smoothFreq1 = smoothTo(source1.frequency, ctx1)

const smoothGain2 = smoothTo(gain2.gain, ctx2)
const smoothFreq2 = smoothTo(source2.frequency, ctx2)

const smoothGain3 = smoothTo(gain3.gain, ctx3)
const smoothFreq3 = smoothTo(source3.frequency, ctx3)

smoothGain1(MAX_VOLUME, 0.15)
smoothGain2(MAX_VOLUME, 0.15)
smoothGain3(MAX_VOLUME, 0.15)




const setFreq1 = () => {
  smoothFreq1(source3.frequency.value * 2 || startingFreq, 0.15)
  setTimeout(() => smoothFreq1(100, 0.85))
}

const setFreq2 = () => {
  smoothFreq2(source1.frequency.value * 2 || startingFreq, 0.15)
  setTimeout(() => smoothFreq2(100, 0.85))
}

const setFreq3 = () => {
  smoothFreq3(source2.frequency.value * 2 || startingFreq, 0.15)
  setTimeout(() => smoothFreq3(100, 0.85))
}


const duration = 1250


setFreq1()
setInterval(setFreq1, duration)

setTimeout(() => {
  setFreq2()
  setInterval(setFreq2, duration)
}, duration * 0.333)

setTimeout(() => {
  setFreq3()
  setInterval(setFreq3, duration)
}, duration * 0.666)
