// @flow

'use strict';

const _ = require('./_');

/*
  @fn : (setArgs) => void

  // => {
    set: (time, setArgs) => sets new interval for fn, calling it each time with setArgs
    clear: () => clears interval
  }
*/
type SetterFn = (time: number, ...setterArgs: Array<any>) => void;
type ClearingFn = () => void;

type DynamicIntervalController = {
  set: SetterFn,
  clear: ClearingFn
};

function dynamicInterval(fn: Function): DynamicIntervalController {
  let now = Date.now();
  let intervals = 0
  let interval, timeout;

  // clear old interval, create a new interval
  const newInterval = (execute, time) => {
    clearInterval(interval);
    interval = setInterval(execute, time);
  }

  const set= (time, ...setArgs) => {
    time = _.round(time);

    // execute fn with setArgs,
    const execute = () => {
      now = Date.now();
      fn(...setArgs);
    }

    // find the amount of time already elapsed, deduct that from the new interval,
    // and set the new interval in the-amount-of-time-left
    const timeElapsed = _.round( Date.now() - now );
    const timeLeft = time - timeElapsed;
    const timeLeftInInterval = _.atLeast(timeLeft)(0);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      execute();
      newInterval(execute, time)
    }, timeLeftInInterval);
  }

  const clear = () => {
    clearInterval(interval);
    clearTimeout(timeout);
  }

  return { set, clear }
}

module.exports = dynamicInterval;
