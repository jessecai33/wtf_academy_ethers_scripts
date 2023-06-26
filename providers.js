import { ethers } from 'ethers';
import 'dotenv/config';

const providerETH = new ethers.providers.JsonRpcProvider(process.env.ETH_MAINNET_RPC);
const providerSepolia = new ethers.providers.JsonRpcProvider(
  process.env.ETH_TESTNET_SEPOLIA_RPC
);

// 1. Balances of vitalik.eth on ETH Mainnet and Sepolia Testnet:
console.log('\n1. Balances of vitalik.eth on ETH Mainnet and Sepolia Testnet:');

const balance = await providerETH.getBalance(process.env.VITALIK_ENS);
const balanceSepolia = await providerSepolia.getBalance(process.env.VITALIK_ENS);

console.log(`\nETH Balance of vitalik.eth: ${ethers.utils.formatEther(balance)}`);
console.log(`Sepolia ETH Balance of vitalik.eth: ${ethers.utils.formatEther(balanceSepolia)}`);

// 2. Check which chain is connected to the provider:
console.log('\n2. Check which chain is connected to the provider:');

const network = await providerETH.getNetwork();
console.log('\nNetwork:');
console.log(network);

// 3. Get the block number of the latest block:
console.log('\n3. Get the block number of the latest block:');

const blockNumber = await providerETH.getBlockNumber();
console.log(`\nBlock Number: ${blockNumber}`);

// 4. Get the current gas price:
console.log('\n4. Get the current gas price:');

const gasPrice = await providerETH.getGasPrice();
console.log(`\nGas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
console.log(gasPrice);

// 5. Get the current gas settings:
console.log('\n5. Get the current fee settings:');

const feeData = await providerETH.getFeeData();
console.log('\nFee Data:');
console.log(feeData);
console.log(
  `Last Base Fee Per Gas: ${ethers.utils.formatUnits(
    feeData.lastBaseFeePerGas,
    'gwei'
  )} gwei`
);
console.log(`Max Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxFeePerGas, 'gwei')} gwei`);
console.log(`Max Priority Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, 'gwei')} gwei`);
console.log(
  `Gas Price: ${ethers.utils.formatUnits(feeData.gasPrice, 'gwei')} gwei`
);

// 6. Get the block information:
console.log('\n6. Get the block information:');

const block = await providerETH.getBlock(0);
console.log('\nBlock:');
console.log(block);

// 7. Get the bytecode of a contract:
console.log('\n7. Get the bytecode of a contract:');

const bytecode = await providerETH.getCode(process.env.WETH_CONTRACT_ADDRESS);
console.log('\nBytecode:');
console.log(bytecode);
