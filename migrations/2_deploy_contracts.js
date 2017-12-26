'use strict';

const FastCashMoneyPlus = artifacts.require('FastCashMoneyPlus');

module.exports = (deployer) => {
  deployer.deploy(FastCashMoneyPlus, { gas: 4700000 });
}
