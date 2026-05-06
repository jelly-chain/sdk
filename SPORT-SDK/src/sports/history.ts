import { Sport, League } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export interface HeadToHead {
  teamA: string;
  teamB: string;
  sport: Sport;
  played: number;
  teamAWins: number;
  teamBWins: number;
  draws: number;
  teamAGoals: number;
  teamBGoals: number;
  lastMeetings: Array<{ date: string; homeScore: number; awayScore: number; winner: string | 'draw' }>;
}

export interface HistoricalChampion {
  league: League;
  season: string;
  champion: string;
  runnerUp: string;
}

export class HistoryModule {
  constructor(private readonly cache: MemoryCache) {}

  async headToHead(teamA: string, teamB: string, sport: Sport): Promise<HeadToHead> {
    const key = `h2h:${[teamA, teamB].sort().join(':')}:${sport}`;
    return (
      this.cache.get<HeadToHead>(key) ?? {
        teamA,
        teamB,
        sport,
        played: 0,
        teamAWins: 0,
        teamBWins: 0,
        draws: 0,
        teamAGoals: 0,
        teamBGoals: 0,
        lastMeetings: [],
      }
    );
  }

  async champions(league: League, limit = 10): Promise<HistoricalChampion[]> {
    const key = `history:champions:${league}`;
    const cached = this.cache.get<HistoricalChampion[]>(key);
    if (cached) return cached.slice(0, limit);
    return [];
  }

  async titleCounts(league: League): Promise<Record<string, number>> {
    const champions = await this.champions(league, 100);
    const counts: Record<string, number> = {};
    for (const c of champions) {
      counts[c.champion] = (counts[c.champion] ?? 0) + 1;
    }
    return counts;
  }
}
