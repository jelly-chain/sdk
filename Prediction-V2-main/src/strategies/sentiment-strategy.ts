import { BaseStrategy } from './base-strategy.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import type { StrategyContext } from './base-strategy.js';

export class SentimentStrategy extends BaseStrategy {
  readonly name = 'sentiment';
  readonly description = 'Drives prediction primarily from social and news sentiment signals';

  async run(input: PredictionInput, context: StrategyContext): Promise<Partial<PredictionOutput>> {
    const sentimentMetric = context.metrics['sentiment'] ?? 0.5;
    const direction = sentimentMetric > 0.6 ? 'bullish' : sentimentMetric < 0.4 ? 'bearish' : 'neutral';
    return {
      signal: direction,
      confidence: Math.abs(sentimentMetric - 0.5) * 2 * 0.8 + 0.2,
      factors: ['sentiment'],
      explanations: [`Sentiment score ${sentimentMetric.toFixed(2)} drove ${direction} signal`],
      metadata: { chain: (input.chain ?? 'unknown') as never, sourceCount: 0, cached: false, strategy: this.name, triggeredBy: 'sentiment' },
      timestamp: new Date().toISOString(),
    };
  }
}
