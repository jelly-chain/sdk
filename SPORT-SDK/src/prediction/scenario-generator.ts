import type { SportsNamespace, IntelligenceNamespace } from '../sdk.js';

export interface Scenario {
  name: string;
  probability: number;
  description: string;
  implications: string[];
}

export class ScenarioGenerator {
  constructor(
    private readonly sports: SportsNamespace,
    private readonly intelligence: IntelligenceNamespace,
  ) {}

  async forFixture(fixtureId: string): Promise<Scenario[]> {
    const fixture = await this.sports.fixtures.byId(fixtureId).catch(() => null);
    if (!fixture) return [];

    const upsets = await this.intelligence.upsets.evaluate(fixtureId);
    const upsetProb = upsets?.upsetProbability ?? 0.3;

    const homeWinProb = upsets?.favoriteTeamId === fixture.homeTeamId
      ? 1 - upsetProb : upsetProb;
    const awayWinProb = 1 - homeWinProb;
    const drawProb = fixture.sport === 'football' ? 0.25 : 0;
    const adj = 1 / (homeWinProb + awayWinProb + drawProb);

    const scenarios: Scenario[] = [
      {
        name: 'Home Win',
        probability: homeWinProb * adj,
        description: `${fixture.homeTeamId} wins at home`,
        implications: ['Market: YES on home-win markets'],
      },
      {
        name: 'Away Win',
        probability: awayWinProb * adj,
        description: `${fixture.awayTeamId} wins away`,
        implications: ['Market: YES on away-win markets'],
      },
    ];

    if (drawProb > 0) {
      scenarios.push({
        name: 'Draw',
        probability: drawProb * adj,
        description: 'Match ends level',
        implications: ['Market: draw markets', 'Both teams to score: possible'],
      });
    }

    return scenarios;
  }
}
