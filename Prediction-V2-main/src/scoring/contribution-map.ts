export interface ContributionEntry {
  factor: string;
  rawValue: number;
  weight: number;
  contribution: number;
  percentage: number;
}

export class ContributionMap {
  build(
    factors: Record<string, number>,
    weights: Record<string, number>,
  ): ContributionEntry[] {
    const entries: ContributionEntry[] = [];
    const total = Object.values(factors).reduce((a, b) => a + Math.abs(b), 0);

    for (const [factor, rawValue] of Object.entries(factors)) {
      const weight = weights[factor] ?? 1;
      const contribution = rawValue * weight;
      const percentage = total > 0 ? (Math.abs(contribution) / total) * 100 : 0;
      entries.push({ factor, rawValue, weight, contribution, percentage });
    }

    return entries.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  }

  topFactors(entries: ContributionEntry[], n = 3): string[] {
    return entries.slice(0, n).map((e) => e.factor);
  }
}
