import type { ScoreResult } from './score-stage.js';
import type { SignalDirection } from '../types.js';
import { Logger } from '../logger.js';

export interface AggregateResult extends ScoreResult {
  direction: SignalDirection;
  confidence: number;
  factors: string[];
  strategy: string;
}

export class AggregateStage {
  private logger = new Logger({ prefix: 'AggregateStage' });

  async run(scored: ScoreResult): Promise<AggregateResult> {
    this.logger.debug('Running aggregate stage');
    const score = scored.aggregateScore;
    const direction: SignalDirection = score > 0.6 ? 'bullish' : score < 0.4 ? 'bearish' : 'neutral';
    const factors = Object.entries(scored.factorContributions)
      .filter(([, v]) => v > 0.05)
      .map(([k]) => k);
    return {
      ...scored,
      direction,
      confidence: Math.min(0.95, score + 0.1),
      factors,
      strategy: 'ensemble',
    };
  }
}
