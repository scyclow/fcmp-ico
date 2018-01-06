
import FastCashMoneyPlusArtifact from 'contracts/FastCashMoneyPlus.json'
import Web3 from 'web3';
import contract from 'truffle-contract';

const FastCashMoneyPlus = contract(FastCashMoneyPlusArtifact);
window.__fcmp = FastCashMoneyPlus;

export default async function web3Setup() {
  if (!!window.web3) {
    console.log('current provider:', window.web3.currentProvider)
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    throw new Error('No web3 context found :\'(')
  }

  FastCashMoneyPlus.setProvider(window.web3.currentProvider);
  const instance = await FastCashMoneyPlus.at('0x9b757690471a5a1b3d9ad9477cc3b0166a85d916');
  FastCashMoneyPlus.web3.eth.defaultAccount = FastCashMoneyPlus.web3.eth.coinbase;

  window.__i = instance;

  return instance;
}

async function getNum(fn) {
  return (await fn).toNumber()
}

export function getBuyData(
  routingCode: string,
  referal: string,
  value: number
): string {

  const web3 = new Web3(new Web3.providers.HttpProvider(''))
  const fakeInst = web3.eth.contract(FastCashMoneyPlusArtifact.abi).at('')
  return fakeInst.buy.getData(routingCode, referal)
}

export function getTransferData(
  to: string,
  amount: number
): string {
  const web3 = new Web3(new Web3.providers.HttpProvider(''))
  const fakeInst = web3.eth.contract(FastCashMoneyPlusArtifact.abi).at('')

  const toBytes = web3.fromUtf8(to)
  const amountInMoneyBucks = amount * (10 ** 18)
  return fakeInst.transferToAccount.getData(toBytes, amountInMoneyBucks)
}

export function executeTransfer(inst, to, amount) {
  const toBytes = web3.fromUtf8(to)
  const amountInMoneyBucks = amount * (10 ** 18)
  return inst.transferToAccount(
    toBytes,
    amountInMoneyBucks,
    { from: web3.eth.coinbase, gas: 150000, gasPrice: 40 * (10 ** 9) }
  )
}

export function simpleBuy(amount) {
  return web3.eth.sendTransaction({
    amount,
    to: '', // TODO -- hardcode address
    from: web3.eth.coinbase,
    gas: 150000,
    gasPrice: 40 * (10 ** 9)
  })
}

export function fromUtf8(str) {
  return web3.fromUtf8(str)
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


