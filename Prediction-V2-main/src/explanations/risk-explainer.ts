import type { RiskProfile } from '../types.js';

export class RiskExplainer {
  explain(risk: RiskProfile): string {
    const pct = `${(risk.score * 100).toFixed(0)}%`;
    const levelText = {
      low: 'low — the prediction carries minimal uncertainty',
      medium: 'moderate — some uncertainty exists in the inputs',
      high: 'elevated — approach with caution and use smaller position sizes',
      critical: 'critical — this prediction has very high uncertainty and should not drive automated action',
    }[risk.level];
    return `Risk score is ${pct} (${levelText}).${risk.factors.length > 0 ? ` Primary risk drivers: ${risk.factors.join(', ')}.` : ''}`;
  }

  toOneLiner(risk: RiskProfile): string {
    return `Risk: ${risk.level} (${(risk.score * 100).toFixed(0)}%)`;
  }
}
