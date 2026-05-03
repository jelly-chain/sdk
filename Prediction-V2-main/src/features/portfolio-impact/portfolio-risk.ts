import type { Exposure } from './exposure.js';
import type { RiskProfile } from '../../types.js';

export interface PortfolioRiskView {
  totalValueUsd: number;
  weightedRiskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  concentrationRisk: number;
  diversificationScore: number;
}

export class PortfolioRiskCalculator {
  calculate(exposures: Exposure[], riskProfiles: Record<string, RiskProfile>): PortfolioRiskView {
    const totalValueUsd = exposures.reduce((a, b) => a + b.valueUsd, 0);
    const weightedRisk = exposures.reduce((sum, e) => {
      const profile = riskProfiles[e.asset];
      return sum + e.weight * (profile?.score ?? 0.5);
    }, 0);
    const concentrationRisk = exposures.length > 0 ? Math.max(...exposures.map((e) => e.weight)) : 0;
    const diversificationScore = Math.max(0, 1 - concentrationRisk);
    const level = weightedRisk < 0.3 ? 'low' : weightedRisk < 0.6 ? 'medium' : weightedRisk < 0.85 ? 'high' : 'critical';
    return { totalValueUsd, weightedRiskScore: weightedRisk, riskLevel: level, concentrationRisk, diversificationScore };
  }
}
