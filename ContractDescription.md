# Description of the FastCashMoneyPlus Ethereum contract

## Contract Basics
- FastCashMoneyPlus is an ERC20 contract
  - It has 18 decimal places of precision. The smallest denomination of FastCash is the MoneyBuck
  - The Symbol is: FASTCASH
  - The Name is: FastCashMoneyPlus
- 1 million FastCash is issued to the bank when the contract is launched.
- The ETH address designated as the Central Banker has discretion over this amount.
  - (The Central Banker can also transfer Central Banking responsabilities to another address)
- The supply of FastCash is fixed, and cannot be changed by any entity

## Investing in FastCash
- Investors buy FastCash from the bank, and the FastCashMoneyPlus Contract associates their ETH address with their FastCash Balance
- Every week, the price of buying FastCash from the bank increases by 20% until week 71, when it stops increasing.
- In Week 0, the price is *equivalent* to $0.25 USD.
- Transactions take place in Ethereum, so the contract must convert the intended USD price to Ethereum using a USD-ETH exchange rate. (The contract actually uses a USD-WEI exchenge rate to make the decimal math work)
- A trusted third party (i.e. The Central Banker) Can update this rate.
- So, the price of FastCash in ETH is equal to:
 ```
 (0.25 * (1.2 ^ weeksSinceLaunch)) * USDETH
 ```
 where USDETH == The amount of ETH you can buy with $1 USD

- Due to lack of floating point numbers, and a maximum integer value of 2 ^ 256, the formula simplifies to:
```
if (weeksSinceLaunch > 71) {
  w = 71;
} else {
  w = weeksSinceLaunch;
}

extraAdjustment = 0;
if (w > 50) {
  extraAdjustment = w - 50;
}

minimumAdjustment = 10;
decimals = 18;
x = w + decimals - (minimumAdjustment + extraAdjustment);

exchangeRate =
  4 * (10 ** x)
  /
  ((USDWEI / (10 ** minimumAdjustment) * ((12 ** w) / (10 ** extraAdustment)))

```

- There are some more notes on the mechanics of this as comments in the contract itself above the `FastCashMoneyPlusSales` section

- This all means that, even after accounting for the time value of money, investors can effectively arbitrage the price of FastCash. For example, you buy FastCash at $0.25, wait 5 weeks for the price to be ~ $0.62, you can sell it on the open market for $0.61.

## Referrals and RoutingCodes
- When buying FastCash for the first time, investors provide a NEW routing code (aka a referral address). This routing code can be used to point to their account for referals and transactions.
- By convention, the routing code is comprised of three words, selected from a predefined list, followed by a string of between 13 and 20 Base64 characters. For example: `toxicGOLD_CASH572kd2eOp8k$n`. This structure is not enforced by the contrac, but is reccomended.
- When FastCash purchases provide a REFERAL routing code, the address it points to receives a FASTCASH BONUS equal to 10% of the purchase. For example, if Alice refers Bob to FastCashMoneyPlus, and Bob purchases 100 FastCash, Alice will receive a bonus of 10 FastCash.
- The Central Banker can also update the referal bonus.
- The referal bonus is only valid insofar as there is enough FastCash in the bank to pay said bonus.

## Other Fetures
- Investors can transfer FastCash to other accounts by using either the FastCash routing code, or the Ethereum address.
- In accordance with ERC20, investors can optionally give other contracts permission to transfer their FastCash.
