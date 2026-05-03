import type { ChainId } from '../types.js';

export interface BridgeFlowSnapshot {
  fromChain: ChainId;
  toChain: ChainId;
  volumeUsd24h: number;
  txCount24h: number;
  netFlow: number;
  timestamp: string;
}

export class BridgeFlowStateProjection {
  private flows: BridgeFlowSnapshot[] = [];

  update(snapshot: BridgeFlowSnapshot): void {
    this.flows = this.flows.filter(
      (f) => !(f.fromChain === snapshot.fromChain && f.toChain === snapshot.toChain),
    );
    this.flows.push(snapshot);
  }

  getNetFlow(chain: ChainId): number {
    const inflow = this.flows.filter((f) => f.toChain === chain).reduce((s, f) => s + f.volumeUsd24h, 0);
    const outflow = this.flows.filter((f) => f.fromChain === chain).reduce((s, f) => s + f.volumeUsd24h, 0);
    return inflow - outflow;
  }

  getAll(): BridgeFlowSnapshot[] {
    return [...this.flows];
  }
}
