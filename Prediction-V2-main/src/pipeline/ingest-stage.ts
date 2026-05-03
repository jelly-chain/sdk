import type { PredictionInput, MarketSignal } from '../types.js';
import type { ConfigManager } from '../config.js';
import { Logger } from '../logger.js';

export interface IngestResult {
  signals: MarketSignal[];
  rawData: Record<string, unknown>[];
  timestamp: string;
}

export class IngestStage {
  private config: ConfigManager;
  private logger = new Logger({ prefix: 'IngestStage' });

  constructor(config: ConfigManager) {
    this.config = config;
  }

  async run(input: PredictionInput): Promise<IngestResult> {
    this.logger.debug('Running ingest stage', { input });
    return {
      signals: [],
      rawData: [],
      timestamp: new Date().toISOString(),
    };
  }
}
