import type { SportsNamespace } from '../sdk.js';

export interface UpsetRisk {
  fixtureId: string;
  favoriteTeamId: string;
  underdogTeamId: string;
  upsetProbability: number;
  riskLevel: 'high' | 'medium' | 'low';
  contributingFactors: string[];
}

export class UpsetDetector {
  constructor(private readonly sports: SportsNamespace) {}

  async evaluate(fixtureId: string): Promise<UpsetRisk | undefined> {
    const fixture = await this.sports.fixtures.byId(fixtureId).catch(() => null);
    if (!fixture) return undefined;

    const [homeTeam, awayTeam] = await Promise.all([
      this.sports.teams.byId(fixture.homeTeamId).catch(() => null),
      this.sports.teams.byId(fixture.awayTeamId).catch(() => null),
    ]);

    const homeRank = homeTeam?.ranking ?? 50;
    const awayRank = awayTeam?.ranking ?? 50;

    const [favoriteTeamId, underdogTeamId] =
      homeRank <= awayRank
        ? [fixture.homeTeamId, fixture.awayTeamId]
        : [fixture.awayTeamId, fixture.homeTeamId];

    const rankGap = Math.abs(homeRank - awayRank);
    const baseUpsetProb = Math.max(0.05, 0.5 - rankGap * 0.005);

    const contributingFactors: string[] = [];
    if (rankGap < 10) contributingFactors.push('close-ranking');
    if (rankGap > 30) contributingFactors.push('large-ranking-gap');

    const riskLevel: UpsetRisk['riskLevel'] =
      baseUpsetProb >= 0.35 ? 'high'
      : baseUpsetProb >= 0.2 ? 'medium'
      : 'low';

    return { fixtureId, favoriteTeamId, underdogTeamId, upsetProbability: baseUpsetProb, riskLevel, contributingFactors };
  }
}
