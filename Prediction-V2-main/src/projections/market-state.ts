import type { ChainId, SignalDirection } from '../types.js';

export interface MarketStateSnapshot {
  chain: ChainId;
  token?: string;
  price: number;
  volume24h: number;
  marketCap: number;
  change24h: number;
  direction: SignalDirection;
  timestamp: string;
}

export class MarketStateProjection {
  private state: Map<string, MarketStateSnapshot> = new Map();

  update(snapshot: MarketStateSnapshot): void {
    const key = `${snapshot.chain}:${snapshot.token ?? '*'}`;
    this.state.set(key, snapshot);
  }

  get(chain: ChainId, token?: string): MarketStateSnapshot | undefined {
    return this.state.get(`${chain}:${token ?? '*'}`);
  }

  getAll(): MarketStateSnapshot[] {
    return [...this.state.values()];
  }
}
