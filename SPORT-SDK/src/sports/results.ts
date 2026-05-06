import { Fixture, League, Sport } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export interface MatchResult {
  fixtureId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  winner: string | 'draw';
  sport: Sport;
  league: League;
  date: string;
}

export class ResultsModule {
  constructor(private readonly cache: MemoryCache) {}

  async recent(league: League, limit = 10): Promise<MatchResult[]> {
    const key = `results:recent:${league}`;
    const cached = this.cache.get<MatchResult[]>(key);
    if (cached) return cached.slice(0, limit);
    return [];
  }

  async forTeam(teamId: string, limit = 10): Promise<MatchResult[]> {
    const key = `results:team:${teamId}`;
    const cached = this.cache.get<MatchResult[]>(key);
    if (cached) return cached.slice(0, limit);
    return [];
  }

  fromFixture(fixture: Fixture): MatchResult | null {
    if (fixture.homeScore === undefined || fixture.awayScore === undefined) return null;
    const winner: string | 'draw' =
      fixture.homeScore > fixture.awayScore
        ? fixture.homeTeamId
        : fixture.awayScore > fixture.homeScore
          ? fixture.awayTeamId
          : 'draw';

    return {
      fixtureId: fixture.id,
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
      homeScore: fixture.homeScore,
      awayScore: fixture.awayScore,
      winner,
      sport: fixture.sport,
      league: fixture.league,
      date: fixture.kickoffUtc,
    };
  }
}
