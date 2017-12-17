'use strict';

const FastCashMoneyPlus = artifacts.require('FastCashMoneyPlus');
// const FastCashMoneyPlusAccessControl = artifacts.require('FastCashMoneyPlus');
// const FastCashMoneyPlusBase = artifacts.require('FastCashMoneyPlus');
// const FastCashMoneyPlusSales = artifacts.require('FastCashMoneyPlus');
// const FastCashMoneyPlusStorage = artifacts.require('FastCashMoneyPlus');
// const FastCashMoneyPlusTransfer = artifacts.require('FastCashMoneyPlus');

module.exports = (deployer) => {
  deployer.deploy(FastCashMoneyPlus);
  // deployer.deploy(FastCashMoneyPlusAccessControl);
  // deployer.deploy(FastCashMoneyPlusBase);
  // deployer.deploy(FastCashMoneyPlusSales);
  // deployer.deploy(FastCashMoneyPlusStorage);
  // deployer.deploy(FastCashMoneyPlusTransfer);
}
