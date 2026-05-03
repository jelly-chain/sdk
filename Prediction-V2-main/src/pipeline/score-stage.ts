import type { EnrichResult } from './enrich-stage.js';
import { Logger } from '../logger.js';

export interface ScoreResult extends EnrichResult {
  signalScores: number[];
  aggregateScore: number;
  factorContributions: Record<string, number>;
}

export class ScoreStage {
  private logger = new Logger({ prefix: 'ScoreStage' });

  async run(enriched: EnrichResult): Promise<ScoreResult> {
    this.logger.debug('Running score stage');
    const sentimentContrib = enriched.sentimentScore * 0.4;
    return {
      ...enriched,
      signalScores: enriched.signals.map(() => 0.5),
      aggregateScore: 0.5 + sentimentContrib * 0.1,
      factorContributions: {
        sentiment: sentimentContrib,
        keyword: 0.1,
        onChain: 0.05,
      },
    };
  }
}
