import { Sport } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export interface MatchupContext {
  homeTeamId: string;
  awayTeamId: string;
  sport: Sport;
  homeFormRating: number;
  awayFormRating: number;
  h2hRecord: { homeWins: number; awayWins: number; draws: number };
  favoredTeam: string | 'even';
  confidence: number;
  narrativeTags: string[];
}

export interface MatchupInput {
  homeTeamId: string;
  awayTeamId: string;
  sport: Sport;
}

export class MatchupEngine {
  constructor(private readonly sports: SportsNamespace) {}

  async compare(input: MatchupInput): Promise<MatchupContext> {
    const { homeTeamId, awayTeamId, sport } = input;

    const [h2h, homeTeam, awayTeam] = await Promise.all([
      this.sports.history.headToHead(homeTeamId, awayTeamId, sport),
      this.sports.teams.byId(homeTeamId).catch(() => null),
      this.sports.teams.byId(awayTeamId).catch(() => null),
    ]);

    const homeFormRating = 0.5;
    const awayFormRating = 0.5;

    const formDelta = homeFormRating - awayFormRating;
    const h2hEdge = h2h.played > 0 ? (h2h.teamAWins - h2h.teamBWins) / h2h.played : 0;
    const combined = formDelta * 0.6 + h2hEdge * 0.4;

    const favoredTeam: string | 'even' =
      combined > 0.1 ? homeTeamId : combined < -0.1 ? awayTeamId : 'even';

    const narrativeTags: string[] = [];
    if (Math.abs(formDelta) > 0.3) narrativeTags.push('form-contrast');
    if (h2h.played > 5 && Math.abs(h2hEdge) > 0.4) narrativeTags.push('h2h-dominant');
    if (homeTeam && awayTeam && Math.abs((homeTeam.ranking ?? 50) - (awayTeam.ranking ?? 50)) > 20) {
      narrativeTags.push('ranking-gap');
    }

    return {
      homeTeamId,
      awayTeamId,
      sport,
      homeFormRating,
      awayFormRating,
      h2hRecord: { homeWins: h2h.teamAWins, awayWins: h2h.teamBWins, draws: h2h.draws },
      favoredTeam,
      confidence: Math.min(0.95, 0.5 + Math.abs(combined) * 0.5),
      narrativeTags,
    };
  }
}
