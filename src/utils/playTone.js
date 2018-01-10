
const MAX_VOLUME = 0.04
let source, gain;
try {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  source = ctx.createOscillator();
  gain = ctx.createGain();

  source.connect(gain)
  gain.connect(ctx.destination)
  gain.gain.value = 0
  source.start()
} catch (e) {
  console.log(e)
}

export default function playTone(baseFreq = 3000, timeout = 200) {
  try {
    const multiplier = _.sample([1, 1.25, 1.3333333, 2, 1.5, 1.125])
    const freq = baseFreq * multiplier

    source.frequency.value = freq
    gain.gain.value = MAX_VOLUME
    setTimeout(() => {
      gain.gain.value = 0
      source.frequency.value = 0
    }, timeout)
  } catch (e) {
    console.log(e)
  }
}
