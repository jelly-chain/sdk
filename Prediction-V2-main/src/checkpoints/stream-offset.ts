import type { ChainId } from '../types.js';

export interface StreamOffset {
  chain: ChainId;
  blockNumber: number;
  eventIndex: number;
  updatedAt: string;
}

export class StreamOffsetTracker {
  private offsets: Map<ChainId, StreamOffset> = new Map();

  set(chain: ChainId, blockNumber: number, eventIndex = 0): void {
    this.offsets.set(chain, { chain, blockNumber, eventIndex, updatedAt: new Date().toISOString() });
  }

  get(chain: ChainId): StreamOffset | undefined {
    return this.offsets.get(chain);
  }

  advance(chain: ChainId, byBlocks: number): void {
    const current = this.offsets.get(chain);
    if (current) this.set(chain, current.blockNumber + byBlocks);
  }

  getAll(): StreamOffset[] {
    return [...this.offsets.values()];
  }
}
