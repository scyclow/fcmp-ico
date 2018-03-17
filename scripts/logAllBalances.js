for (let i = 0; i < await __i.totalInvestors.call(); i++) {
  const routingCode = await __i.routingCodes(i)
  const balance = await __i.balanceOfRoutingCode.call(routingCode)
  console.log(web3.toUtf8(routingCode), balance.toNumber())
}
