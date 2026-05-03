import type { ChainId } from '../types.js';

export interface LiquiditySnapshot {
  chain: ChainId;
  protocol?: string;
  tvlUsd: number;
  tvlChange24h: number;
  depth: number;
  timestamp: string;
}

export class LiquidityStateProjection {
  private snapshots: Map<string, LiquiditySnapshot> = new Map();

  update(snapshot: LiquiditySnapshot): void {
    const key = `${snapshot.chain}:${snapshot.protocol ?? '*'}`;
    this.snapshots.set(key, snapshot);
  }

  get(chain: ChainId, protocol?: string): LiquiditySnapshot | undefined {
    return this.snapshots.get(`${chain}:${protocol ?? '*'}`);
  }

  getTotalTVL(chain: ChainId): number {
    return [...this.snapshots.values()]
      .filter((s) => s.chain === chain)
      .reduce((sum, s) => sum + s.tvlUsd, 0);
  }
}
