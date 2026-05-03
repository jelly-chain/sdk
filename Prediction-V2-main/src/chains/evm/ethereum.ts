import type { ChainDefinition } from '../registry.js';

export const ETHEREUM_CHAIN: ChainDefinition = {
  id: 'ethereum',
  name: 'Ethereum Mainnet',
  numericId: 1,
  nativeCurrency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrls: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth'],
};
