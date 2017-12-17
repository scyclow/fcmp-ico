pragma solidity ^0.4.17;
/*
  Copyright 2017, FastCashMoneyPlus.biz

  This is highly propriatary software. Under no circumstances is anyone, except for employees of
  FastCashMoneyPlus.biz, authorized to modify, distribute, use, or otherwise profit from these
  contracts. Anyone
*/
contract FastCashMoneyPlusAccessControl {
  address public centralBanker;
  // TODO make pausable?

  function FastCashMoneyPlusAccessControl() public {
    centralBanker = msg.sender;
  }

  modifier onlyCentralBanker() {
    require(msg.sender == centralBanker);
    _;
  }

  function setCentralBanker(address newCentralBanker) external onlyCentralBanker {
    require(newCentralBanker != address(0));
    centralBanker = newCentralBanker;
  }
}

contract ERC20 {
  // Maybe i should implement these?
  // Remain compliant with ERC20 without actually implementing these features
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {
    return false;
  }
  function approve(address _spender, uint256 _value) external returns (bool success) {
    return false;
  }
  function allowance(address _owner, address _spender) external constant returns (uint256 remaining) {
    return 0;
  }

  // Triggered when tokens are transferred.
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  // Triggered whenever approve(address _spender, uint256 _value) is called.
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  // Optional
  // function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
  // function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);

  // ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
  // function supportsInterface(bytes4 _interfaceID) external view returns (bool);
}

contract FastCashMoneyPlusBase is FastCashMoneyPlusAccessControl, ERC20 {
  string public name = "Fast Cash Money Plus";
  string public symbol = "FASTCASH";
  uint8 public decimals = 18;

  event Sale(bytes32 _routingCode, uint256 _amount);
}

contract FastCashMoneyPlusStorage is FastCashMoneyPlusBase {
  mapping (bytes32 => address) public routingCodeMap;
  mapping (address => uint256) public balanceOf;
  bytes32[] public routingCodes;

  // add a function that checks if an account exists
}

contract FastCashMoneyPlusSales is FastCashMoneyPlusStorage {
  // is this supposed to by the total circulating supply, or si this the bank?
  uint256 public totalSupply = 1000000;

  // TODO exchangeRate -- onlyCentralBanker can change
  // TODO fastcash > eth price goes up by constant multiplier every week
    // start at equivalent of $0.25
    // every week, increase by 1.2815392824 (brings you to 100,000 after one year)

  function FastCashMoneyPlusSales() public {
    bytes32 centralBankerRoutingCode = "electricGOD_POWERvyS4xY69R";
    routingCodes.push(centralBankerRoutingCode);
    routingCodeMap[centralBankerRoutingCode] = msg.sender;

    uint256 reserve = totalSupply / 4;
    totalSupply -= reserve;
    balanceOf[msg.sender] = reserve;
  }

  function buy(bytes32 _routingCode, uint256 _amount/*, bytes32 referal*/) external returns (bool success) {
// if routing code exists, use address
// else if routing code doesnt exist, add to mappings + routing code list
// adjust amount by exchange rate
// require that amount is > 0
// require that there is enough  fastcash in the bank
// check for overflows

// calculate eth cost
  // based on exchange rate by "trusted third party"
  // adjust by multiplier, which doubles every couple weeks or so
// transfer central banker the eth
  // give existing fastcash holders part of it?

// withdraw from bank
// credit to new routing code
// pay finder's fee if any money is left in bank
  // or, just give referers some eth if their balance is above a certain number
// Sale event
// return true
  }
}

contract FastCashMoneyPlusTransfer is FastCashMoneyPlusSales {
  function _transfer(
    address _from,
    address _to,
    uint256 _amount
  ) internal returns (bool success) {
    require(_to != address(0));
    require(_to != address(this));
    require(_amount > 0);
    require(balanceOf[_from] >= _amount);
    require(balanceOf[_to] + _amount > balanceOf[_to]);

    balanceOf[_from] -= _amount;
    balanceOf[_to] += _amount;

    Transfer(msg.sender, _to, _amount);

    return true;
  }
// TODO transfer messages?
  function transfer(address _to, uint256 _amount) external returns (bool success) {
    return _transfer(msg.sender, _to, _amount);
  }

  function transferToAccount(bytes32 _toRoutingCode, uint256 _amount) external returns (bool success) {
    return _transfer(msg.sender, routingCodeMap[_toRoutingCode], _amount);
  }

  // TODO transfer account ownership?
}

contract FastCashMoneyPlus is FastCashMoneyPlusTransfer {

}
