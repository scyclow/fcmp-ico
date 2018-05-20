export default (obj, ctx) => (value, timeInSeconds) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}
