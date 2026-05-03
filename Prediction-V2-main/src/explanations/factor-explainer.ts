import type { ContributionEntry } from '../scoring/contribution-map.js';

export class FactorExplainer {
  explain(entry: ContributionEntry): string {
    const direction = entry.contribution >= 0 ? 'positively' : 'negatively';
    const pct = `${entry.percentage.toFixed(1)}%`;
    return `"${entry.factor}" contributed ${direction} with ${pct} weight to the final signal.`;
  }

  explainAll(entries: ContributionEntry[]): string[] {
    return entries.map((e) => this.explain(e));
  }

  topExplanations(entries: ContributionEntry[], n = 3): string[] {
    return entries.slice(0, n).map((e) => this.explain(e));
  }
}
