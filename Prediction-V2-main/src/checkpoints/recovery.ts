import type { CheckpointStore } from './checkpoint-store.js';
import type { StreamOffsetTracker } from './stream-offset.js';
import type { ChainId } from '../types.js';
import { Logger } from '../logger.js';

export class RecoveryManager {
  private checkpoints: CheckpointStore;
  private offsets: StreamOffsetTracker;
  private logger = new Logger({ prefix: 'Recovery' });

  constructor(checkpoints: CheckpointStore, offsets: StreamOffsetTracker) {
    this.checkpoints = checkpoints;
    this.offsets = offsets;
  }

  async restore(chain: ChainId): Promise<{ blockNumber: number } | null> {
    const offset = this.offsets.get(chain);
    if (!offset) {
      this.logger.warn(`No offset found for chain: ${chain}`);
      return null;
    }
    this.logger.info(`Restoring from block ${offset.blockNumber} on ${chain}`);
    return { blockNumber: offset.blockNumber };
  }

  async saveProgress(chain: ChainId, blockNumber: number): Promise<void> {
    this.offsets.set(chain, blockNumber);
    this.checkpoints.save(`progress:${chain}`, { chain, blockNumber });
    this.logger.debug(`Saved progress for ${chain} at block ${blockNumber}`);
  }
}
