import _ from 'utils/_'

export const currencySymbols = [{
  code: '$',
  char: '$',
  prob: 13
}, {
  code: '&#165',
  char: '¥',
  prob: 6
}, {
  code: '&#8364',
  char: '€',
  prob: 5
}, {
  code: '&#163',
  char: '£',
  prob: 5
}, {
  code: '&#8361',
  char: '₩',
  prob: 2
}, {
  code: '&#8373',
  char: '₵',
  prob: 2
}, {
  code: '&#8369',
  char: '₱',
  prob: 2
}, {
  code: '&#3647',
  char: '฿',
  prob: 2
}, {
  code: '&#8377',
  char: '₹',
  prob: 1
}, {
  code: '&#8363',
  char: '₫',
  prob: 1
}, {
  code: '&#8353',
  char: '₡',
  prob: 1
}, {
  code: '&#8366',
  char: '₮',
  prob: 1
}, {
  code: '&#8367',
  char: '₯',
  prob: 1
}];

const currencyHat = currencySymbols.reduce((hat, currency) => {
  _.times(currency.prob, () => {
    hat.push(currency.char);
  });
  return hat;
}, []);

export const randCurrency = () => _.sample(currencyHat);

export function * tickerGenerator() {
  const quantity = 30;
  const maxIx = quantity * 3;
  let cashIx = 0;

  const allChars = {
    fast: '>',
    cash: '$',
    plus: '+'
  };

  const getStaticTicker = () => {
    let output = [];
    _.times(quantity, () => output.push(allChars.fast));
    _.times(quantity, () => output.push(randCurrency()));
    _.times(quantity, () => output.push(allChars.plus));
    return output;
  };

  const incIndex = (ix) => ix + 1 < maxIx ? ix + 1 : 0;

  let generateTicker = () => {
    cashIx = incIndex(cashIx);
    const staticTicker = getStaticTicker();
    const left = _.takeRight(staticTicker, cashIx);
    const right = _.take(staticTicker, maxIx - cashIx);

    return left.concat(right).join('');
  };

  while (true) {
    yield generateTicker();
  }
}

