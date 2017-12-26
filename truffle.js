module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id
      gas: 4700000
    },
    ropsten: {
      network_id: 3,
      host: '127.0.0.1',
      port: 8545,
      gas: 4000000,
      from: '0x50064486bda085407c84da3b195364719051b215'
    }
  }
};
