/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Migrations = __webpack_require__(1);

var _Migrations2 = _interopRequireDefault(_Migrations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('bleh');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"contractName":"Migrations","abi":[{"constant":false,"inputs":[{"name":"new_address","type":"address"}],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"last_completed_migration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"completed","type":"uint256"}],"name":"setCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"bytecode":"0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102db8061005e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f01014610067578063445df0ac146100a05780638da5cb5b146100c9578063fdacd5761461011e575b600080fd5b341561007257600080fd5b61009e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610141565b005b34156100ab57600080fd5b6100b3610224565b6040518082815260200191505060405180910390f35b34156100d457600080fd5b6100dc61022a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012957600080fd5b61013f600480803590602001909190505061024f565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610220578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561020b57600080fd5b6102c65a03f1151561021c57600080fd5b5050505b5050565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102ac57806001819055505b505600a165627a7a72305820d53ac6059fd9b72fd86f5f5bee2858be2e79e5c44a58621641bfc4ceba685d750029","deployedBytecode":"0x606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f01014610067578063445df0ac146100a05780638da5cb5b146100c9578063fdacd5761461011e575b600080fd5b341561007257600080fd5b61009e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610141565b005b34156100ab57600080fd5b6100b3610224565b6040518082815260200191505060405180910390f35b34156100d457600080fd5b6100dc61022a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012957600080fd5b61013f600480803590602001909190505061024f565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610220578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561020b57600080fd5b6102c65a03f1151561021c57600080fd5b5050505b5050565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102ac57806001819055505b505600a165627a7a72305820d53ac6059fd9b72fd86f5f5bee2858be2e79e5c44a58621641bfc4ceba685d750029","sourceMap":"26:488:0:-;;;178:58;;;;;;;;221:10;213:5;;:18;;;;;;;;;;;;;;;;;;26:488;;;;;;","deployedSourceMap":"26:488:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;347:165;;;;;;;;;;;;;;;;;;;;;;;;;;;;74:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;50:20;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;240:103;;;;;;;;;;;;;;;;;;;;;;;;;;347:165;409:19;161:5;;;;;;;;;;;147:19;;:10;:19;;;143:26;;;442:11;409:45;;460:8;:21;;;482:24;;460:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;143:26;347:165;;:::o;74:36::-;;;;:::o;50:20::-;;;;;;;;;;;;;:::o;240:103::-;161:5;;;;;;;;;;;147:19;;:10;:19;;;143:26;;;329:9;302:24;:36;;;;143:26;240:103;:::o","source":"pragma solidity ^0.4.17;\n\ncontract Migrations {\n  address public owner;\n  uint public last_completed_migration;\n\n  modifier restricted() {\n    if (msg.sender == owner) _;\n  }\n\n  function Migrations() public {\n    owner = msg.sender;\n  }\n\n  function setCompleted(uint completed) public restricted {\n    last_completed_migration = completed;\n  }\n\n  function upgrade(address new_address) public restricted {\n    Migrations upgraded = Migrations(new_address);\n    upgraded.setCompleted(last_completed_migration);\n  }\n}\n","sourcePath":"/Users/spikelny/Desktop/projects/fastcash-ico/contracts/Migrations.sol","ast":{"attributes":{"absolutePath":"/Users/spikelny/Desktop/projects/fastcash-ico/contracts/Migrations.sol","exportedSymbols":{"Migrations":[56]}},"children":[{"attributes":{"literals":["solidity","^","0.4",".17"]},"id":1,"name":"PragmaDirective","src":"0:24:0"},{"attributes":{"baseContracts":[null],"contractDependencies":[null],"contractKind":"contract","documentation":null,"fullyImplemented":true,"linearizedBaseContracts":[56],"name":"Migrations","scope":57},"children":[{"attributes":{"constant":false,"name":"owner","scope":56,"stateVariable":true,"storageLocation":"default","type":"address","value":null,"visibility":"public"},"children":[{"attributes":{"name":"address","type":"address"},"id":2,"name":"ElementaryTypeName","src":"50:7:0"}],"id":3,"name":"VariableDeclaration","src":"50:20:0"},{"attributes":{"constant":false,"name":"last_completed_migration","scope":56,"stateVariable":true,"storageLocation":"default","type":"uint256","value":null,"visibility":"public"},"children":[{"attributes":{"name":"uint","type":"uint256"},"id":4,"name":"ElementaryTypeName","src":"74:4:0"}],"id":5,"name":"VariableDeclaration","src":"74:36:0"},{"attributes":{"name":"restricted","visibility":"internal"},"children":[{"attributes":{"parameters":[null]},"children":[],"id":6,"name":"ParameterList","src":"134:2:0"},{"children":[{"attributes":{"falseBody":null},"children":[{"attributes":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_address","typeString":"address"},"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"==","type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"member_name":"sender","referencedDeclaration":null,"type":"address"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":68,"type":"msg","value":"msg"},"id":7,"name":"Identifier","src":"147:3:0"}],"id":8,"name":"MemberAccess","src":"147:10:0"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":3,"type":"address","value":"owner"},"id":9,"name":"Identifier","src":"161:5:0"}],"id":10,"name":"BinaryOperation","src":"147:19:0"},{"id":11,"name":"PlaceholderStatement","src":"168:1:0"}],"id":12,"name":"IfStatement","src":"143:26:0"}],"id":13,"name":"Block","src":"137:37:0"}],"id":14,"name":"ModifierDefinition","src":"115:59:0"},{"attributes":{"constant":false,"implemented":true,"isConstructor":true,"modifiers":[null],"name":"Migrations","payable":false,"scope":56,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"attributes":{"parameters":[null]},"children":[],"id":15,"name":"ParameterList","src":"197:2:0"},{"attributes":{"parameters":[null]},"children":[],"id":16,"name":"ParameterList","src":"207:0:0"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"address"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":3,"type":"address","value":"owner"},"id":17,"name":"Identifier","src":"213:5:0"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"member_name":"sender","referencedDeclaration":null,"type":"address"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":68,"type":"msg","value":"msg"},"id":18,"name":"Identifier","src":"221:3:0"}],"id":19,"name":"MemberAccess","src":"221:10:0"}],"id":20,"name":"Assignment","src":"213:18:0"}],"id":21,"name":"ExpressionStatement","src":"213:18:0"}],"id":22,"name":"Block","src":"207:29:0"}],"id":23,"name":"FunctionDefinition","src":"178:58:0"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"name":"setCompleted","payable":false,"scope":56,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"completed","scope":35,"stateVariable":false,"storageLocation":"default","type":"uint256","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"uint","type":"uint256"},"id":24,"name":"ElementaryTypeName","src":"262:4:0"}],"id":25,"name":"VariableDeclaration","src":"262:14:0"}],"id":26,"name":"ParameterList","src":"261:16:0"},{"attributes":{"parameters":[null]},"children":[],"id":29,"name":"ParameterList","src":"296:0:0"},{"attributes":{"arguments":[null]},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":14,"type":"modifier ()","value":"restricted"},"id":27,"name":"Identifier","src":"285:10:0"}],"id":28,"name":"ModifierInvocation","src":"285:10:0"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"uint256"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":5,"type":"uint256","value":"last_completed_migration"},"id":30,"name":"Identifier","src":"302:24:0"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":25,"type":"uint256","value":"completed"},"id":31,"name":"Identifier","src":"329:9:0"}],"id":32,"name":"Assignment","src":"302:36:0"}],"id":33,"name":"ExpressionStatement","src":"302:36:0"}],"id":34,"name":"Block","src":"296:47:0"}],"id":35,"name":"FunctionDefinition","src":"240:103:0"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"name":"upgrade","payable":false,"scope":56,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"new_address","scope":55,"stateVariable":false,"storageLocation":"default","type":"address","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"address","type":"address"},"id":36,"name":"ElementaryTypeName","src":"364:7:0"}],"id":37,"name":"VariableDeclaration","src":"364:19:0"}],"id":38,"name":"ParameterList","src":"363:21:0"},{"attributes":{"parameters":[null]},"children":[],"id":41,"name":"ParameterList","src":"403:0:0"},{"attributes":{"arguments":[null]},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":14,"type":"modifier ()","value":"restricted"},"id":39,"name":"Identifier","src":"392:10:0"}],"id":40,"name":"ModifierInvocation","src":"392:10:0"},{"children":[{"attributes":{"assignments":[43]},"children":[{"attributes":{"constant":false,"name":"upgraded","scope":55,"stateVariable":false,"storageLocation":"default","type":"contract Migrations","value":null,"visibility":"internal"},"children":[{"attributes":{"contractScope":null,"name":"Migrations","referencedDeclaration":56,"type":"contract Migrations"},"id":42,"name":"UserDefinedTypeName","src":"409:10:0"}],"id":43,"name":"VariableDeclaration","src":"409:19:0"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"isStructConstructorCall":false,"lValueRequested":false,"names":[null],"type":"contract Migrations","type_conversion":true},"children":[{"attributes":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"overloadedDeclarations":[null],"referencedDeclaration":56,"type":"type(contract Migrations)","value":"Migrations"},"id":44,"name":"Identifier","src":"431:10:0"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":37,"type":"address","value":"new_address"},"id":45,"name":"Identifier","src":"442:11:0"}],"id":46,"name":"FunctionCall","src":"431:23:0"}],"id":47,"name":"VariableDeclarationStatement","src":"409:45:0"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"isStructConstructorCall":false,"lValueRequested":false,"names":[null],"type":"tuple()","type_conversion":false},"children":[{"attributes":{"argumentTypes":[{"typeIdentifier":"t_uint256","typeString":"uint256"}],"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"member_name":"setCompleted","referencedDeclaration":35,"type":"function (uint256) external"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":43,"type":"contract Migrations","value":"upgraded"},"id":48,"name":"Identifier","src":"460:8:0"}],"id":50,"name":"MemberAccess","src":"460:21:0"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":5,"type":"uint256","value":"last_completed_migration"},"id":51,"name":"Identifier","src":"482:24:0"}],"id":52,"name":"FunctionCall","src":"460:47:0"}],"id":53,"name":"ExpressionStatement","src":"460:47:0"}],"id":54,"name":"Block","src":"403:109:0"}],"id":55,"name":"FunctionDefinition","src":"347:165:0"}],"id":56,"name":"ContractDefinition","src":"26:488:0"}],"id":57,"name":"SourceUnit","src":"0:515:0"},"compiler":{"name":"solc","version":"0.4.18+commit.9cf6e910.Emscripten.clang"},"networks":{"4447":{"events":{},"links":{},"address":"0x8cdaf0cd259887258bc13a92c0a6da92698644c0"}},"schemaVersion":"1.0.1","updatedAt":"2017-12-17T01:27:53.299Z"}

/***/ })
/******/ ]);