import type { BaseStrategy } from '../strategies/base-strategy.js';
import type { PredictionInput } from '../types.js';
import type { StrategyContext } from '../strategies/base-strategy.js';

export class StrategyRouter {
  private strategies: BaseStrategy[] = [];

  register(strategy: BaseStrategy): void {
    this.strategies.push(strategy);
  }

  selectStrategies(input: PredictionInput, context: StrategyContext): BaseStrategy[] {
    if (input.strategies && input.strategies.length > 0) {
      return this.strategies.filter((s) => input.strategies!.includes(s.name));
    }
    return this.strategies.filter((s) => s.isApplicable(input, context));
  }

  listAll(): string[] {
    return this.strategies.map((s) => s.name);
  }
}
