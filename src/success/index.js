// @flow

import $ from 'utils/$';
import _ from 'utils/_';
import createSource from 'utils/createSource';
import { getQueryParams } from 'utils/getRef'
import './index.css';

const smoothTo = (obj, ctx) => (value, timeInSeconds) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}

const audioVersion = Number(getQueryParams().audioVersion)

if (audioVersion === 1) {
  console.log('dssdf')
/* Audio 1 -- 2 source alarm */
  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)

  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  const smoothGain2 = smoothTo(gain2.gain, ctx2)
  const smoothFreq2 = smoothTo(source2.frequency, ctx2)

  smoothGain1(MAX_VOLUME, 0.15)
  smoothGain2(MAX_VOLUME, 0.15)

  const setFreq1 = () => {
    smoothFreq1(source2.frequency.value * 3 || 1500, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(source1.frequency.value * 3 || 1500, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1000)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1000)
  }, 500)

} else if (audioVersion === 2) {
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  /* Audio 2a -- 3 source progression, 1 muted */

  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  const smoothGain2 = smoothTo(gain2.gain, ctx2)
  const smoothFreq2 = smoothTo(source2.frequency, ctx2)

  const smoothGain3 = smoothTo(gain3.gain, ctx3)
  const smoothFreq3 = smoothTo(source3.frequency, ctx3)

  smoothGain1(MAX_VOLUME, 0.15)
  smoothGain2(MAX_VOLUME, 0.15)

  const setFreq1 = () => {
    smoothFreq1(source3.frequency.value * 3 || startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(source1.frequency.value * 3 || startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothFreq3(source2.frequency.value * 3 || startingFreq, 0.15)
    setTimeout(() => smoothFreq3(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1000)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1000)
  }, 333)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 900)
  }, 666)
} else if (audioVersion === 3) {
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////

  /* Audio 3 -- 3 source progression */
  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


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
    smoothFreq1(source3.frequency.value * 2.5 || startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(source1.frequency.value * 2.5 || startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothFreq3(source2.frequency.value * 2.5 || startingFreq, 0.15)
    setTimeout(() => smoothFreq3(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1000)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1000)
  }, 333)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 900)
  }, 666)

} else if (audioVersion === 4) {

///////////////////////////////////////////////
///////////////////////////////////////////////

/* Audio 4 -- 3 source siren */

  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


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
    smoothFreq1(startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothFreq3(startingFreq, 0.15)
    setTimeout(() => smoothFreq3(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1000)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1000)
  }, 333)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 1000)
  }, 666)

} else if (audioVersion === 5) {
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
  /* Audio 5 -- rhythmic siren*/

  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


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
    smoothFreq1(startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(source1.frequency.value * 2, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothFreq3(source1.frequency.value * 2, 0.15)
    setTimeout(() => smoothFreq3(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1000)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1000)
  }, 333)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 1000)
  }, 666)


} else if (audioVersion === 6) {
/////////////////////////////////////
/////////////////////////////////////
/* Audio 6 -- slow siren*/

  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


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
    smoothFreq1(startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothFreq2(startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothFreq3(startingFreq, 0.15)
    setTimeout(() => smoothFreq3(100, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1250)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1250)
  }, 333 * 1.25)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 1250)
  }, 666 * 1.25)

} else if (audioVersion === 7) {
  /////////////////////////////////////
  /////////////////////////////////////
  /* Audio 7 -- slow, low siren*/

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

  setFreq1()
  setInterval(setFreq1, 1250)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1250)
  }, 333 * 1.25)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 1250)
  }, 666 * 1.25)

} else if (audioVersion === 8) {
  /////////////////////////////////////
  /////////////////////////////////////
  /* Audio 8 -- inverse siren*/

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


  const setFreq1 = () => {
    smoothGain1(MAX_VOLUME, 0.15)
    smoothFreq1(startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothGain2(MAX_VOLUME, 0.15)
    smoothFreq2(startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothGain3(MAX_VOLUME, 0.15)
    smoothFreq3(100, 0.15)
    setTimeout(() => smoothFreq3(1250, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1250)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1250)
  }, 15)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 1250)
  }, 30)

} else if (audioVersion === 9) {
  /////////////////////////////////////
  /////////////////////////////////////
  /* Audio 9 -- chaotic*/

  const startingFreq = 2000;
  const MAX_VOLUME = 0.04;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001)


  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  const smoothGain2 = smoothTo(gain2.gain, ctx2)
  const smoothFreq2 = smoothTo(source2.frequency, ctx2)

  const smoothGain3 = smoothTo(gain3.gain, ctx3)
  const smoothFreq3 = smoothTo(source3.frequency, ctx3)


  const setFreq1 = () => {
    smoothGain1(MAX_VOLUME, 0.15)
    smoothFreq1(startingFreq, 0.15)
    setTimeout(() => smoothFreq1(100, 0.85))
  }

  const setFreq2 = () => {
    smoothGain2(MAX_VOLUME, 0.15)
    smoothFreq2(startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothGain3(MAX_VOLUME, 0.15)
    smoothFreq3(startingFreq, 0.15)
    setTimeout(() => smoothFreq3(1250, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1250)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1250)
  }, 15)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 100)
  }, 30)

} else if (audioVersion === 10) {
  /////////////////////////////////////
  /////////////////////////////////////
  /* Audio 10 -- chaotic*/

  const startingFreq = 2000;
  const MAX_VOLUME = 0.02;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(0, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(0, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(0, 0.00000001, 'square')


  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  const smoothGain2 = smoothTo(gain2.gain, ctx2)
  const smoothFreq2 = smoothTo(source2.frequency, ctx2)

  const smoothGain3 = smoothTo(gain3.gain, ctx3)
  const smoothFreq3 = smoothTo(source3.frequency, ctx3)


  const setFreq1 = () => {
    smoothGain1(MAX_VOLUME, 0.15)
    smoothFreq1(100, 0.15)
    setTimeout(() => smoothFreq1(startingFreq, 0.85))
  }

  const setFreq2 = () => {
    smoothGain2(MAX_VOLUME, 0.15)
    smoothFreq2(startingFreq, 0.15)
    setTimeout(() => smoothFreq2(100, 0.85))
  }

  const setFreq3 = () => {
    smoothGain3(MAX_VOLUME / 2, 0.15)
    smoothFreq3(startingFreq, 0.15)
    setTimeout(() => smoothFreq3(1000, 0.85))
  }

  setFreq1()
  setInterval(setFreq1, 1250)

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, 1250)
  }, 15)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, 100)
  }, 30)
}

