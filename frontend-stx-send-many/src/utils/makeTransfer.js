import { openSTXTransfer } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { AnchorMode } from '@stacks/transactions';

export const makeTransfer = async (network, address, amount) => {
  return new Promise((resolve, reject) => {
    openSTXTransfer({
      network: 
      network === "mainnet" ? 
        new StacksMainnet() : 
        network === "testnet" ? 
          new StacksTestnet() : 
          new StacksTestnet({ url: 'https://api.nakamoto.testnet.hiro.so' }),

      anchorMode: AnchorMode.Any,
      recipient: address,
      amount,
      onFinish: response => {
        try {
          console.log(response.txId);
          resolve(true);
        } catch (error) {
          console.error(error);
          reject(false);
        }
      },
      onCancel: () => {
        console.log('Canceled');
        resolve(false);
      },
    });
  });
};