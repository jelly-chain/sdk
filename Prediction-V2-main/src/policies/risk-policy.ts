import type { PredictionOutput } from '../types.js';

export class RiskPolicy {
  private maxRiskScore: number;

  constructor(maxRiskScore = 0.85) {
    this.maxRiskScore = maxRiskScore;
  }

  check(output: PredictionOutput): boolean {
    return output.riskScore <= this.maxRiskScore;
  }

  setMaxRiskScore(value: number): void {
    this.maxRiskScore = value;
  }

  getMaxRiskScore(): number {
    return this.maxRiskScore;
  }
}
