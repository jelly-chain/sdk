import type { PredictionInput, PredictionOutput } from '../types.js';

export interface StrategyContext {
  signals: Record<string, unknown>[];
  metrics: Record<string, number>;
  timestamp: string;
}

export abstract class BaseStrategy {
  abstract readonly name: string;
  abstract readonly description: string;

  abstract run(input: PredictionInput, context: StrategyContext): Promise<Partial<PredictionOutput>>;

  isApplicable(_input: PredictionInput, _context: StrategyContext): boolean {
    return true;
  }
}
