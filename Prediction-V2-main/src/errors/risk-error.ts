import { SDKError } from './base-error.js';

export class RiskError extends SDKError {
  public readonly riskScore: number;
  public readonly threshold: number;

  constructor(riskScore: number, threshold: number, context?: Record<string, unknown>) {
    super(`Risk score ${riskScore.toFixed(2)} exceeds threshold ${threshold.toFixed(2)}`, 'RISK_ERROR', context);
    this.riskScore = riskScore;
    this.threshold = threshold;
  }
}
