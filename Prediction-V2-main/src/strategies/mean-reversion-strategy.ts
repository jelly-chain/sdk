import { BaseStrategy } from './base-strategy.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import type { StrategyContext } from './base-strategy.js';

export class MeanReversionStrategy extends BaseStrategy {
  readonly name = 'mean-reversion';
  readonly description = 'Identifies conditions where price or sentiment has deviated significantly from historical mean';

  async run(input: PredictionInput, context: StrategyContext): Promise<Partial<PredictionOutput>> {
    const deviation = context.metrics['deviation'] ?? 0;
    const direction = deviation > 0.2 ? 'bearish' : deviation < -0.2 ? 'bullish' : 'neutral';
    return {
      signal: direction,
      confidence: Math.min(0.9, 0.4 + Math.abs(deviation)),
      factors: ['mean-reversion'],
      explanations: [`Deviation from mean: ${deviation.toFixed(3)}`],
      metadata: { chain: (input.chain ?? 'unknown') as never, sourceCount: 0, cached: false, strategy: this.name, triggeredBy: 'deviation' },
      timestamp: new Date().toISOString(),
    };
  }
}
