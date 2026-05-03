import type { ChainDefinition } from '../registry.js';

export const POLYGON_CHAIN: ChainDefinition = {
  id: 'polygon',
  name: 'Polygon PoS',
  numericId: 137,
  nativeCurrency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrls: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
};
