import type { ChainId } from '../types.js';

const EXPLORER_URLS: Record<string, string> = {
  ethereum: 'https://etherscan.io',
  bsc: 'https://bscscan.com',
  base: 'https://basescan.org',
  polygon: 'https://polygonscan.com',
  arbitrum: 'https://arbiscan.io',
  optimism: 'https://optimistic.etherscan.io',
  avalanche: 'https://snowtrace.io',
};

export function getExplorerUrl(chain: ChainId): string {
  return EXPLORER_URLS[chain] ?? 'https://etherscan.io';
}

export function getTxUrl(chain: ChainId, txHash: string): string {
  return `${getExplorerUrl(chain)}/tx/${txHash}`;
}

export function getAddressUrl(chain: ChainId, address: string): string {
  return `${getExplorerUrl(chain)}/address/${address}`;
}

export function getBlockUrl(chain: ChainId, blockNumber: number): string {
  return `${getExplorerUrl(chain)}/block/${blockNumber}`;
}
