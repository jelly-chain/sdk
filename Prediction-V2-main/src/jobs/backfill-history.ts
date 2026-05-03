import type { ChainId } from '../types.js';
import { Logger } from '../logger.js';

export interface BackfillOptions {
  chain: ChainId;
  fromBlock: number;
  toBlock: number;
  batchSize?: number;
}

export class BackfillHistoryJob {
  private logger = new Logger({ prefix: 'BackfillHistoryJob' });

  async run(options: BackfillOptions, handler: (fromBlock: number, toBlock: number) => Promise<void>): Promise<{ batches: number; durationMs: number }> {
    const start = Date.now();
    const batchSize = options.batchSize ?? 1_000;
    let batches = 0;
    this.logger.info('Starting backfill', options);
    for (let from = options.fromBlock; from <= options.toBlock; from += batchSize) {
      const to = Math.min(from + batchSize - 1, options.toBlock);
      await handler(from, to);
      batches++;
    }
    const durationMs = Date.now() - start;
    this.logger.info(`Backfill complete — ${batches} batches in ${durationMs}ms`);
    return { batches, durationMs };
  }
}
