import { League, Standing } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export interface LeagueContextReport {
  league: League;
  season: string;
  topTeam: string | null;
  titleRace: string[];
  relegationBattle: string[];
  playoffBubble: string[];
  totalTeams: number;
}

export class LeagueContext {
  constructor(private readonly sports: SportsNamespace) {}

  async report(league: League, season?: string): Promise<LeagueContextReport> {
    const [standings, leagueInfo, currentSeason] = await Promise.all([
      this.sports.standings.byLeague(league, season),
      this.sports.leagues.byId(league),
      this.sports.leagues.currentSeason(league),
    ]);

    const resolvedSeason = season ?? currentSeason;
    const topN = standings.slice(0, 4).map((s: Standing) => s.teamId);
    const bottom = standings.slice(-3).map((s: Standing) => s.teamId);
    const half = Math.floor(standings.length / 2);
    const bubble = standings.slice(half - 1, half + 1).map((s: Standing) => s.teamId);

    return {
      league,
      season: resolvedSeason,
      topTeam: standings[0]?.teamId ?? null,
      titleRace: topN,
      relegationBattle: leagueInfo?.hasRelegation ? bottom : [],
      playoffBubble: bubble,
      totalTeams: standings.length,
    };
  }
}
