import { Standing, League, Team } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export class StandingsModule {
  constructor(private readonly cache: MemoryCache) {}

  async byLeague(league: League, season?: string): Promise<Standing[]> {
    const key = `standings:${league}:${season ?? 'current'}`;
    return this.cache.get<Standing[]>(key) ?? [];
  }

  async forTeam(teamId: string, league: League, season?: string): Promise<Standing | undefined> {
    const standings = await this.byLeague(league, season);
    return standings.find((s) => s.teamId === teamId);
  }

  async topN(league: League, n: number, season?: string): Promise<Standing[]> {
    const standings = await this.byLeague(league, season);
    return standings.slice(0, n);
  }

  async playoffBubble(league: League, season?: string): Promise<{ safe: Standing[]; bubble: Standing[]; out: Standing[] }> {
    const standings = await this.byLeague(league, season);
    const half = Math.floor(standings.length / 2);
    return {
      safe: standings.slice(0, half - 2),
      bubble: standings.slice(half - 2, half + 2),
      out: standings.slice(half + 2),
    };
  }
}
