import { BaseStrategy } from './base-strategy.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import type { StrategyContext } from './base-strategy.js';

export class VolatilityStrategy extends BaseStrategy {
  readonly name = 'volatility';
  readonly description = 'Uses realized volatility and volatility regime to inform the prediction direction and risk';

  async run(input: PredictionInput, context: StrategyContext): Promise<Partial<PredictionOutput>> {
    const vol = context.metrics['volatility'] ?? 0.2;
    const isHighVol = vol > 0.5;
    return {
      signal: 'neutral',
      confidence: isHighVol ? 0.35 : 0.6,
      riskScore: Math.min(1, vol),
      factors: ['volatility'],
      explanations: [`Realized volatility: ${vol.toFixed(3)} — ${isHighVol ? 'high' : 'normal'} regime`],
      metadata: { chain: (input.chain ?? 'unknown') as never, sourceCount: 0, cached: false, strategy: this.name, triggeredBy: 'volatility' },
      timestamp: new Date().toISOString(),
    };
  }
}
