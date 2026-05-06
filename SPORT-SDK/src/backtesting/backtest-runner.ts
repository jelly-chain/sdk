import type { SportsNamespace, PredictionNamespace } from '../sdk.js';

export interface BacktestConfig {
  league: string;
  season: string;
  fromDate?: string;
  toDate?: string;
}

export interface BacktestResult {
  config: BacktestConfig;
  totalFixtures: number;
  predictions: number;
  correct: number;
  accuracy: number;
  brierScore: number;
  logLoss: number;
  calibrationError: number;
  runAt: string;
}

export class BacktestRunner {
  constructor(
    private readonly sports: SportsNamespace,
    private readonly prediction: PredictionNamespace,
  ) {}

  async run(config: BacktestConfig): Promise<BacktestResult> {
    const fixtures = await this.sports.fixtures.byLeague(
      config.league as Parameters<typeof this.sports.fixtures.byLeague>[0],
      config.season,
    );
    const finished = fixtures.filter((f) => f.status === 'finished');

    let brierSum = 0;
    let logLossSum = 0;
    let correct = 0;
    const predictions = finished.length;

    for (const fixture of finished) {
      const features = await this.prediction.features.build({
        marketType: 'MATCH_WINNER',
        teamIds: [fixture.homeTeamId, fixture.awayTeamId],
        fixtureId: fixture.id,
      });
      const confidence = this.prediction.confidence.score(features);
      const p = confidence.score;

      const actualOutcome = fixture.homeScore !== undefined && fixture.awayScore !== undefined
        ? (fixture.homeScore > fixture.awayScore ? 1 : 0)
        : 0.5;

      brierSum += Math.pow(p - actualOutcome, 2);
      logLossSum += -(actualOutcome * Math.log(Math.max(p, 1e-10)) + (1 - actualOutcome) * Math.log(Math.max(1 - p, 1e-10)));
      if (Math.abs(p - 0.5) > 0.1 && ((p > 0.5 && actualOutcome === 1) || (p < 0.5 && actualOutcome === 0))) correct++;
    }

    return {
      config,
      totalFixtures: fixtures.length,
      predictions,
      correct,
      accuracy: predictions > 0 ? correct / predictions : 0,
      brierScore: predictions > 0 ? brierSum / predictions : 0,
      logLoss: predictions > 0 ? logLossSum / predictions : 0,
      calibrationError: 0,
      runAt: new Date().toISOString(),
    };
  }
}
