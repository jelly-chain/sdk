import type { ChainId } from '../types.js';

export interface BridgeAnomalyResult {
  isAnomaly: boolean;
  volumeUsd: number;
  threshold: number;
  fromChain: ChainId;
  toChain: ChainId;
  direction: 'inflow' | 'outflow';
}

export class BridgeAnomalyDetector {
  private threshold: number;

  constructor(threshold = 1_000_000) {
    this.threshold = threshold;
  }

  detect(volumeUsd: number, fromChain: ChainId, toChain: ChainId): BridgeAnomalyResult {
    const isAnomaly = volumeUsd >= this.threshold;
    return {
      isAnomaly,
      volumeUsd,
      threshold: this.threshold,
      fromChain,
      toChain,
      direction: 'inflow',
    };
  }
}
