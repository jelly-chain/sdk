export interface NormalizedOdds {
  outcome: string;
  decimalOdds: number;
  impliedProbability: number;
  americanOdds: number;
}

export class OddsNormalizer {
  fromDecimal(outcome: string, decimalOdds: number): NormalizedOdds {
    return {
      outcome,
      decimalOdds,
      impliedProbability: decimalOdds > 0 ? 1 / decimalOdds : 0,
      americanOdds: this.decimalToAmerican(decimalOdds),
    };
  }

  fromAmerican(outcome: string, americanOdds: number): NormalizedOdds {
    const decimal = americanOdds > 0
      ? americanOdds / 100 + 1
      : 100 / Math.abs(americanOdds) + 1;
    return this.fromDecimal(outcome, decimal);
  }

  fromFractional(outcome: string, numerator: number, denominator: number): NormalizedOdds {
    const decimal = numerator / denominator + 1;
    return this.fromDecimal(outcome, decimal);
  }

  private decimalToAmerican(decimal: number): number {
    if (decimal >= 2) return Math.round((decimal - 1) * 100);
    return Math.round(-100 / (decimal - 1));
  }

  removeOverround(odds: NormalizedOdds[]): NormalizedOdds[] {
    const total = odds.reduce((s, o) => s + o.impliedProbability, 0);
    if (total === 0) return odds;
    return odds.map((o) => ({
      ...o,
      impliedProbability: o.impliedProbability / total,
    }));
  }
}
