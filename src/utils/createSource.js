// @flow

export default function createSource(freq = 500, volume = 0.04, srcType?: string = 'sine') {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  const source = ctx.createOscillator();
  const gain = ctx.createGain();

  source.connect(gain)
  gain.connect(ctx.destination)

  gain.gain.value = volume
  source.type = srcType
  source.frequency.value = freq
  source.start()
  return { source, gain, ctx };
}
