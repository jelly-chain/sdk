import type { ChainDefinition } from '../registry.js';

export const BASE_CHAIN: ChainDefinition = {
  id: 'base',
  name: 'Base',
  numericId: 8453,
  nativeCurrency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrls: ['https://mainnet.base.org', 'https://base.llamarpc.com'],
};
