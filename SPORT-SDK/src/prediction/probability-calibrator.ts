export interface NormalizedOdds {
  label: string;
  rawProbability: number;
  calibratedProbability: number;
}

export class ProbabilityCalibrator {
  calibrate(raw: number, alpha = 0, beta = 1): number {
    const logit = alpha + beta * Math.log(raw / (1 - raw));
    return 1 / (1 + Math.exp(-logit));
  }

  removeOverround(odds: Array<{ label: string; probability: number }>): NormalizedOdds[] {
    const total = odds.reduce((s, o) => s + o.probability, 0);
    if (total === 0) return odds.map((o) => ({ label: o.label, rawProbability: 0, calibratedProbability: 0 }));
    return odds.map((o) => ({
      label: o.label,
      rawProbability: o.probability,
      calibratedProbability: o.probability / total,
    }));
  }

  normalize(probabilities: number[]): number[] {
    const total = probabilities.reduce((s, p) => s + p, 0);
    if (total === 0) return probabilities.map(() => 1 / probabilities.length);
    return probabilities.map((p) => p / total);
  }

  oddsToImpliedProb(decimalOdds: number): number {
    return 1 / decimalOdds;
  }

  americanToImpliedProb(americanOdds: number): number {
    if (americanOdds > 0) return 100 / (americanOdds + 100);
    return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
  }
}
