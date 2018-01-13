// @flow

import _ from 'utils/_'

const keyWords = [
  'god',
  'sex',
  'power',
  'love',
  'wealth',
  'fast',
  'cash',
  'now',
  'money',
  'click',
  'fuck',
  'opportunity',
  'digital',
  'dream',
  'energy',
  'spirit',
  'pure',
  'clean',
  'plus',
  'advanced',
  'electric',
  'freedom',
  'life',
  'death',
  'accumulation',
  'easy',
  'fear',
  'destiny',
  'believe',
  'seared',
  'immediate',
  'pump',
  'bang',
  'cool',
  'fat',
  'secure',
  'mint',
  'fresh',
  'transparent',
  'sweet',
  'crypto',
  'growth',
  'vibrant',
  'buzz',
  'gold',
  'dynamic',
  'ace',
  'glorious',
  'corruption',
  'viral',
  'revolution',
  'toxic',
  'octane',
  'euphoric',
];

function randInsert (original: string, content: string): string {
  const randIx = _.random(2, original.length - 1, true);

  return original.slice(0, randIx)
    + content
    + original.slice(randIx);
};

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+$'
export function makeHash(min: number, max: number) {
  return _.times(_.random(min, max, true), i => {
    return _.sample(chars)
  }).join('');
}

export function createAddress() {
  const hash = makeHash(13, 20);

  return [
    _.sample(keyWords),
    _.sample(keyWords).toUpperCase(),
    '_',
    _.sample(keyWords).toUpperCase(),
    hash
  ].join('');
}
