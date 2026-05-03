import type { IngestResult } from './ingest-stage.js';
import { Logger } from '../logger.js';

export interface EnrichResult extends IngestResult {
  enrichedSignals: Record<string, unknown>[];
  sentimentScore: number;
  onChainContext: Record<string, unknown>;
}

export class EnrichStage {
  private logger = new Logger({ prefix: 'EnrichStage' });

  async run(ingest: IngestResult): Promise<EnrichResult> {
    this.logger.debug('Running enrich stage');
    return {
      ...ingest,
      enrichedSignals: [],
      sentimentScore: 0.5,
      onChainContext: {},
    };
  }
}
