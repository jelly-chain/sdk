import type { ChainDefinition } from '../registry.js';

export const BSC_CHAIN: ChainDefinition = {
  id: 'bsc',
  name: 'BNB Smart Chain',
  numericId: 56,
  nativeCurrency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrls: ['https://bsc-dataseed.binance.org', 'https://rpc.ankr.com/bsc'],
};
