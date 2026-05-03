import type { ChainId } from '../types.js';

export interface RawChainData {
  tvl?: number;
  bridgeVolume?: number;
  gasPrice?: number;
  blockTime?: number;
  activeAddresses?: number;
  [key: string]: unknown;
}

export interface NormalizedChainData {
  chain: ChainId;
  tvl: number;
  bridgeVolume: number;
  gasPrice: number;
  blockTime: number;
  activeAddresses: number;
  healthScore: number;
  timestamp: string;
}

export class ChainDataNormalizer {
  normalize(raw: RawChainData, chain: ChainId): NormalizedChainData {
    const tvl = raw.tvl ?? 0;
    const bridgeVolume = raw.bridgeVolume ?? 0;
    const healthScore = Math.min(1, (tvl / 1_000_000_000) * 0.5 + (bridgeVolume / 100_000_000) * 0.5);
    return {
      chain,
      tvl,
      bridgeVolume,
      gasPrice: raw.gasPrice ?? 0,
      blockTime: raw.blockTime ?? 0,
      activeAddresses: raw.activeAddresses ?? 0,
      healthScore,
      timestamp: new Date().toISOString(),
    };
  }
}
