import { Fixture, Sport, League, MatchStatus, MatchStage } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';
import { NotFoundError } from '../errors.js';

export interface FixtureFilters {
  sport?: Sport;
  league?: League;
  teamId?: string;
  status?: MatchStatus;
  stage?: MatchStage;
  season?: string;
  fromDate?: string;
  toDate?: string;
}

export class FixturesModule {
  constructor(private readonly cache: MemoryCache) {}

  async list(filters: FixtureFilters = {}): Promise<Fixture[]> {
    const key = `fixtures:list:${JSON.stringify(filters)}`;
    const cached = this.cache.get<Fixture[]>(key);
    if (cached) return cached;
    const result: Fixture[] = [];
    this.cache.set(key, result);
    return result;
  }

  async byId(id: string): Promise<Fixture> {
    const key = `fixtures:${id}`;
    const cached = this.cache.get<Fixture>(key);
    if (cached) return cached;
    throw new NotFoundError('Fixture', id);
  }

  async upcoming(teamId: string, sport?: Sport): Promise<Fixture[]> {
    return this.list({ teamId, sport, status: 'scheduled' });
  }

  async recentResults(teamId: string, limit = 5): Promise<Fixture[]> {
    const results = await this.list({ teamId, status: 'finished' });
    return results.slice(0, limit);
  }

  async live(sport?: Sport): Promise<Fixture[]> {
    return this.list({ sport, status: 'live' });
  }

  async byLeague(league: League, season?: string): Promise<Fixture[]> {
    return this.list({ league, season });
  }
}
