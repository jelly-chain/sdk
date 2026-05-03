import type { RiskLevel } from '../types.js';

export interface RiskProfileModel {
  score: number;
  level: RiskLevel;
  factors: string[];
  volatility: number;
  liquidityRisk: number;
  sentimentRisk: number;
  downsideEstimate: number;
  timestamp: string;
}

export function scoreToLevel(score: number): RiskLevel {
  if (score < 0.3) return 'low';
  if (score < 0.6) return 'medium';
  if (score < 0.85) return 'high';
  return 'critical';
}

export function createRiskProfile(
  partial: Omit<RiskProfileModel, 'level' | 'timestamp'>,
): RiskProfileModel {
  return {
    ...partial,
    level: scoreToLevel(partial.score),
    timestamp: new Date().toISOString(),
  };
}
