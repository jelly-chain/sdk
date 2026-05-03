import type { ChainId } from '../types.js';

export interface ChainHealthSnapshot {
  chain: ChainId;
  latestBlock: number;
  gasPrice: number;
  tps: number;
  errorRate: number;
  healthScore: number;
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
}

export class ChainHealthStateProjection {
  private snapshots: Map<ChainId, ChainHealthSnapshot> = new Map();

  update(snapshot: ChainHealthSnapshot): void {
    this.snapshots.set(snapshot.chain, snapshot);
  }

  get(chain: ChainId): ChainHealthSnapshot | undefined {
    return this.snapshots.get(chain);
  }

  getHealthy(): ChainId[] {
    return [...this.snapshots.values()]
      .filter((s) => s.status === 'healthy')
      .map((s) => s.chain);
  }

  isHealthy(chain: ChainId): boolean {
    return this.snapshots.get(chain)?.status === 'healthy';
  }
}
