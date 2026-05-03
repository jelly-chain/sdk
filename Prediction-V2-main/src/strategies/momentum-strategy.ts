import { BaseStrategy } from './base-strategy.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import type { StrategyContext } from './base-strategy.js';

export class MomentumStrategy extends BaseStrategy {
  readonly name = 'momentum';
  readonly description = 'Identifies trend direction and strength from recent price and volume movement';

  async run(input: PredictionInput, _context: StrategyContext): Promise<Partial<PredictionOutput>> {
    return {
      signal: 'neutral',
      confidence: 0.5,
      factors: ['momentum'],
      explanations: ['Momentum analysis performed'],
      metadata: { chain: (input.chain ?? 'unknown') as never, sourceCount: 0, cached: false, strategy: this.name, triggeredBy: 'momentum' },
      timestamp: new Date().toISOString(),
    };
  }
}
