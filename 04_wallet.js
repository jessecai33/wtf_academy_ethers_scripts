import { ethers } from 'ethers';
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_TESTNET_SEPOLIA_RPC
);

// const wallet1 = ethers.Wallet.createRandom();
// const wallet1WithProvider = wallet1.connect(provider);
// const mnemonic = wallet1.mnemonic;
// const address1 = wallet1.address;
// const privateKey1 = wallet1.privateKey;

const wallet = new ethers.Wallet(process.env.DEV_WALLET_PRIVATE_KEY, provider);
const wallet1 = new ethers.Wallet(
  process.env.DEV2_WALLET_PRIVATE_KEY,
  provider
);

const main = async () => {
  console.log('\n1. Getting wallet info:');
  // console.log(`\nWallet 1 Address: ${address1}`);
  // console.log(`Wallet 1 Mnemonic: ${mnemonic.phrase}`);
  // console.log(`Wallet 1 Private Key: ${wallet1.privateKey}`);
  const address = await wallet.getAddress();
  const address1 = await wallet1.getAddress();
  console.log(`\nWallet Address: ${address}`);
  console.log(`Wallet1 Address: ${address1}`);

  const txCount = await wallet.getTransactionCount();
  const txCount1 = await wallet1.getTransactionCount();
  console.log(`\nTransaction Count: ${txCount}`);
  console.log(`Transaction Count1: ${txCount1}`);

  console.log('\n2. Sending ETH from wallet to wallet1:');
  console.log('\nBalances before transfer:');

  console.log(
    `Wallet Balance: ${ethers.utils.formatEther(await wallet.getBalance())} ETH`
  );
  console.log(
    `Wallet1 Balance: ${ethers.utils.formatEther(
      await wallet1.getBalance()
    )} ETH`
  );

  const tx = {
    to: address1,
    value: ethers.utils.parseEther('0.001')
  };
  console.log('Awaiting for confirmation...');
  const receipt = await wallet.sendTransaction(tx);
  await receipt.wait();
  console.log(receipt);

  console.log('\nBalances after transfer:');
  console.log(
    `Wallet Balance: ${ethers.utils.formatEther(await wallet.getBalance())} ETH`
  );
  console.log(
    `Wallet1 Balance: ${ethers.utils.formatEther(
      await wallet1.getBalance()
    )} ETH`
  );
};

main();
