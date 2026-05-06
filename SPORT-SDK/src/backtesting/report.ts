import { BacktestResult } from './backtest-runner.js';

export interface BacktestReport {
  title: string;
  summary: string;
  results: BacktestResult[];
  bestAccuracy: number;
  bestBrierScore: number;
  generatedAt: string;
}

export class BacktestReport {
  static build(results: BacktestResult[], title = 'Sports Backtest Report'): BacktestReport {
    const bestAccuracy = Math.max(...results.map((r) => r.accuracy));
    const bestBrierScore = Math.min(...results.map((r) => r.brierScore));

    const summary = results
      .map((r) => `${r.config.league} ${r.config.season}: accuracy=${(r.accuracy * 100).toFixed(1)}% brier=${r.brierScore.toFixed(3)}`)
      .join('; ');

    return {
      title,
      summary,
      results,
      bestAccuracy,
      bestBrierScore,
      generatedAt: new Date().toISOString(),
    };
  }

  static toMarkdown(report: BacktestReport): string {
    const lines = [
      `# ${report.title}`,
      '',
      `Generated: ${report.generatedAt}`,
      '',
      `## Summary`,
      '',
      report.summary,
      '',
      `## Results`,
      '',
      '| League | Season | Fixtures | Accuracy | Brier Score | Log Loss |',
      '|--------|--------|----------|----------|-------------|----------|',
    ];

    for (const r of report.results) {
      lines.push(
        `| ${r.config.league} | ${r.config.season} | ${r.totalFixtures} | ${(r.accuracy * 100).toFixed(1)}% | ${r.brierScore.toFixed(3)} | ${r.logLoss.toFixed(3)} |`,
      );
    }

    return lines.join('\n');
  }
}
