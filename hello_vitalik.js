import { ethers } from 'ethers';
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_MAINNET_RPC
);

const main = async () => {
  const balance = await provider.getBalance('vitalik.eth');
  console.log(`\nETH Balance of vitalik.eth: ${ethers.utils.formatEther(balance)}`);
};

main();
