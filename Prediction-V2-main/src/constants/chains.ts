export const CHAIN_IDS = {
  ETHEREUM: 'ethereum',
  BSC: 'bsc',
  BASE: 'base',
  POLYGON: 'polygon',
  ARBITRUM: 'arbitrum',
  OPTIMISM: 'optimism',
  AVALANCHE: 'avalanche',
} as const;

export type SupportedChain = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export const CHAIN_NUMERIC_IDS: Record<SupportedChain, number> = {
  ethereum: 1,
  bsc: 56,
  base: 8453,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  avalanche: 43114,
};

export const CHAIN_NAMES: Record<SupportedChain, string> = {
  ethereum: 'Ethereum Mainnet',
  bsc: 'BNB Smart Chain',
  base: 'Base',
  polygon: 'Polygon PoS',
  arbitrum: 'Arbitrum One',
  optimism: 'Optimism',
  avalanche: 'Avalanche C-Chain',
};

export const DEFAULT_CHAINS: SupportedChain[] = ['ethereum', 'bsc'];
