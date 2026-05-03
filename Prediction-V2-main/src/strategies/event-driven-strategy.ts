import { BaseStrategy } from './base-strategy.js';
import type { PredictionInput, PredictionOutput } from '../types.js';
import type { StrategyContext } from './base-strategy.js';

export class EventDrivenStrategy extends BaseStrategy {
  readonly name = 'event-driven';
  readonly description = 'Reacts to on-chain or off-chain events such as protocol launches, TVL changes, or bridge flows';

  async run(input: PredictionInput, context: StrategyContext): Promise<Partial<PredictionOutput>> {
    const hasEvents = context.signals.length > 0;
    return {
      signal: hasEvents ? 'bullish' : 'neutral',
      confidence: hasEvents ? 0.65 : 0.4,
      factors: ['event'],
      explanations: [hasEvents ? `${context.signals.length} event(s) detected` : 'No events detected'],
      metadata: { chain: (input.chain ?? 'unknown') as never, sourceCount: context.signals.length, cached: false, strategy: this.name, triggeredBy: 'event' },
      timestamp: new Date().toISOString(),
    };
  }
}
