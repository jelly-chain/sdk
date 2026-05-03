import type { ChainId } from '../types.js';

export interface ChainRuntimeConfig {
  chain: ChainId;
  rpcUrl?: string;
  apiKey?: string;
  pollingIntervalMs?: number;
  maxBlockRange?: number;
  confirmations?: number;
}

const defaults: Record<string, Partial<ChainRuntimeConfig>> = {
  ethereum: { pollingIntervalMs: 12_000, maxBlockRange: 2000, confirmations: 12 },
  bsc: { pollingIntervalMs: 3_000, maxBlockRange: 5000, confirmations: 3 },
  base: { pollingIntervalMs: 2_000, maxBlockRange: 5000, confirmations: 5 },
  polygon: { pollingIntervalMs: 2_000, maxBlockRange: 5000, confirmations: 20 },
};

export function getChainDefaults(chain: ChainId): Partial<ChainRuntimeConfig> {
  return defaults[chain] ?? {};
}

export function mergeChainConfig(
  chain: ChainId,
  overrides?: Partial<ChainRuntimeConfig>,
): ChainRuntimeConfig {
  return { chain, ...getChainDefaults(chain), ...overrides };
}
