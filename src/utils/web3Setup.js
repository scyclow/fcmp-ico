
import FastCashMoneyPlusArtifact from 'contracts/FastCashMoneyPlus.json'
import Web3 from 'web3';
import contract from 'truffle-contract';

const FastCashMoneyPlus = contract(FastCashMoneyPlusArtifact);
window.__fcmp = FastCashMoneyPlus;

export default async function web3Setup() {
  if (!!window.web3) {
    console.log(window.web3.currentProvider)
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.error('No web3 context found :\'(')
    return false;
  }

  FastCashMoneyPlus.setProvider(window.web3.currentProvider);

  const instance = await FastCashMoneyPlus.deployed();
  FastCashMoneyPlus.web3.eth.defaultAccount = FastCashMoneyPlus.web3.eth.coinbase;

  window.__i = instance;

  return instance;
}

async function getNum(fn) {
  return (await fn).toNumber()
}

// FastCashMoneyPlus.deployed().then(async i => {
  // window.buy = () => i.buy(
  //   'easy_fuck_click124',
  //   'easy_fuck_click123',
  //   { from: web3.eth.coinbase, value: 4000000000000000, gas: 150000 }
  // )

//   window.display = async () => {
//     const totalInvestors = await getNum(i.totalInvestors.call());
//     for (let j=0; j< totalInvestors; j++) {
//       const routingCode = await i.routingCodes.call(j);
//       const address = await i.routingCodeMap.call(routingCode);
//       const balance = await getNum(i.balanceOf.call(address));

//       console.log(web3.toUtf8(routingCode));
//       console.log('address:', address);
//       console.log('balance:', balance / (10**18));
//     }
//   }
// })
// .catch(e => {
//   console.log('meh...', e)
// })


