import { createAddress } from '@stacks/transactions';
import axios from 'axios';

export const isAddressValid = (address) => {
  try {
    createAddress(address);
    return true;
  } catch {
    return false;
  };
};

export const isAmountValid = (value) => {
  const amountRegex = /^\d*\.?\d*$/;

  if (!amountRegex.test(value)) return false;

  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) return false;
  
  const decimalPart = value.split('.')[1];
  if (decimalPart && decimalPart.length > 6) return false;
  
  return Number.isInteger(numberValue * Math.pow(10, 6));
};

export const getMempoolTransactionCount = async (address, network) => {
  try {
    const url = 
      network === "mainnet" ? 
        'https://api.hiro.so/extended/v1/tx/mempool' :
        network === "testnet" ? 
          'https://api.testnet.hiro.so/extended/v1/tx/mempool' :
          'https://api.nakamoto.testnet.hiro.so/extended/v1/tx/mempool';

    const response = await axios.get(url, {
      params: {
        address,
        limit: 50,
        unanchored: true,
      },
    });
    const transactionsCount = response.data.results.length;
    return transactionsCount;
  } catch (error) {
    if (error?.response?.status === 429) {
      return false;
    } else {
      return null;
    };
  }
};
