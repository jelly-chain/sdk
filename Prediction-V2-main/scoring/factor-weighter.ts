export interface FactorWeight {
  factor: string;
  weight: number;
}

export class FactorWeighter {
  private weights: Map<string, number> = new Map();

  constructor(initial: FactorWeight[] = []) {
    for (const { factor, weight } of initial) {
      this.weights.set(factor, weight);
    }
  }

  getWeight(factor: string): number {
    return this.weights.get(factor) ?? 0;
  }

  setWeight(factor: string, weight: number): void {
    this.weights.set(factor, weight);
  }

  applyWeights(factors: Record<string, number>): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [factor, value] of Object.entries(factors)) {
      result[factor] = value * (this.weights.get(factor) ?? 1);
    }
    return result;
  }

  normalize(): void {
    const total = [...this.weights.values()].reduce((a, b) => a + b, 0);
    if (total === 0) return;
    for (const [key, val] of this.weights) {
      this.weights.set(key, val / total);
    }
  }
}
