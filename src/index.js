import symbol from 'assets/FC-sans-serif.svg';

const parser = new DOMParser()


const $test = document.getElementById('test')
for (let i=0; i < 50; i++) {
  const $symbol = parser.parseFromString(symbol(), 'image/svg+xml').children[0]
  $symbol.style.width = '18px';
  $test.appendChild($symbol)
}
