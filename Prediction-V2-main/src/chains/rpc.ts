import type { ChainId } from '../types.js';

const PUBLIC_RPC_URLS: Record<string, string[]> = {
  ethereum: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth'],
  bsc: ['https://bsc-dataseed.binance.org', 'https://rpc.ankr.com/bsc'],
  base: ['https://mainnet.base.org', 'https://base.llamarpc.com'],
  polygon: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
  arbitrum: ['https://arb1.arbitrum.io/rpc', 'https://rpc.ankr.com/arbitrum'],
  optimism: ['https://mainnet.optimism.io', 'https://rpc.ankr.com/optimism'],
  avalanche: ['https://api.avax.network/ext/bc/C/rpc', 'https://rpc.ankr.com/avalanche'],
};

export function getPublicRpcUrls(chain: ChainId): string[] {
  return PUBLIC_RPC_URLS[chain] ?? [];
}

export function getPrimaryRpcUrl(chain: ChainId): string {
  const urls = getPublicRpcUrls(chain);
  return urls[0] ?? '';
}
