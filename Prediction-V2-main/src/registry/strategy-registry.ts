import type { BaseStrategy } from '../strategies/base-strategy.js';

class StrategyRegistry {
  private registry = new Map<string, BaseStrategy>();

  register(strategy: BaseStrategy): void {
    this.registry.set(strategy.name, strategy);
  }

  get(name: string): BaseStrategy | undefined {
    return this.registry.get(name);
  }

  has(name: string): boolean {
    return this.registry.has(name);
  }

  list(): string[] {
    return [...this.registry.keys()];
  }

  unregister(name: string): void {
    this.registry.delete(name);
  }
}

export const strategyRegistry = new StrategyRegistry();
