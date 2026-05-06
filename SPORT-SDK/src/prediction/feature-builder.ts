import { SportMarketType } from '../types.js';
import type { SportsNamespace, IntelligenceNamespace } from '../sdk.js';

export interface PredictionFeatures {
  marketType: SportMarketType;
  homeFormRating: number;
  awayFormRating: number;
  homeInjuryImpact: number;
  awayInjuryImpact: number;
  h2hEdge: number;
  rankingDelta: number;
  dataCompleteness: number;
  teamIds: string[];
}

export interface FeatureBuildInput {
  marketType: SportMarketType;
  teamIds: string[];
  fixtureId?: string;
}

export class FeatureBuilder {
  constructor(
    private readonly sports: SportsNamespace,
    private readonly intelligence: IntelligenceNamespace,
  ) {}

  async build(input: FeatureBuildInput): Promise<PredictionFeatures> {
    const [homeId, awayId] = input.teamIds;

    if (!homeId || !awayId) {
      return {
        marketType: input.marketType,
        homeFormRating: 0.5,
        awayFormRating: 0.5,
        homeInjuryImpact: 0,
        awayInjuryImpact: 0,
        h2hEdge: 0,
        rankingDelta: 0,
        dataCompleteness: 0.2,
        teamIds: input.teamIds,
      };
    }

    const [homeTeam, awayTeam, homeInjuries, awayInjuries] = await Promise.all([
      this.sports.teams.byId(homeId).catch(() => null),
      this.sports.teams.byId(awayId).catch(() => null),
      this.intelligence.injuries.summary(homeId),
      this.intelligence.injuries.summary(awayId),
    ]);

    const homeRank = homeTeam?.ranking ?? 50;
    const awayRank = awayTeam?.ranking ?? 50;
    const rankingDelta = (awayRank - homeRank) / 100;

    return {
      marketType: input.marketType,
      homeFormRating: 0.5,
      awayFormRating: 0.5,
      homeInjuryImpact: homeInjuries.impactScore,
      awayInjuryImpact: awayInjuries.impactScore,
      h2hEdge: 0,
      rankingDelta,
      dataCompleteness: homeTeam && awayTeam ? 0.8 : 0.4,
      teamIds: input.teamIds,
    };
  }
}
