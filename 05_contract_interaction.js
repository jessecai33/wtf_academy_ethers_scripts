import { ethers } from 'ethers';
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_TESTNET_SEPOLIA_RPC
);

const wallet = new ethers.Wallet(process.env.DEV_WALLET_PRIVATE_KEY, provider);

const abiWETH = [
  'function balanceOf(address) public view returns(uint)',
  'function deposit() public payable',
  'function transfer(address, uint) public returns (bool)',
  'function withdraw(uint) public'
];
const addressWETH = process.env.WETH_CONTRACT_ADDRESS_SEPOLIA;
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);

const address = await wallet.getAddress();
console.log('\n1. Reading balance from WETH Contract:');
const balanceWETH = await contractWETH.balanceOf(address);
console.log(
  `Balance of WETH before deposit: ${ethers.utils.formatEther(balanceWETH)}`
);

console.log('\n2. Depositing ETH to WETH Contract:');
const tx = await contractWETH.deposit({
  value: ethers.utils.parseEther('0.001')
});
await tx.wait();
console.log(`Transaction: ${tx.hash}`);
console.log(tx);
const balanceWETHAfterDeposit = await contractWETH.balanceOf(address);
console.log(
  `Balance of WETH after deposit: ${ethers.utils.formatEther(
    balanceWETHAfterDeposit
  )}`
);

console.log('\n3. Transfer 0.0001 WETH to another wallet:');
const tx1 = await contractWETH.transfer(
  process.env.DEV2_WALLET_ADDRESS,
  ethers.utils.parseEther('0.0001')
);
await tx1.wait();
const balanceWETHAfterTransfer = await contractWETH.balanceOf(address);
console.log(
  `Balance of WETH after transfer: ${ethers.utils.formatEther(
    balanceWETHAfterTransfer
  )}`
);
