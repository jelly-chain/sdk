import { Team, Sport, League } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';
import { NotFoundError } from '../errors.js';

export class TeamsModule {
  constructor(private readonly cache: MemoryCache) {}

  async list(sport?: Sport, league?: League): Promise<Team[]> {
    const key = `teams:${sport ?? '*'}:${league ?? '*'}`;
    return this.cache.get<Team[]>(key) ?? [];
  }

  async byId(id: string): Promise<Team> {
    const cached = this.cache.get<Team>(`team:${id}`);
    if (cached) return cached;
    throw new NotFoundError('Team', id);
  }

  async byName(name: string, sport?: Sport): Promise<Team | undefined> {
    const teams = await this.list(sport);
    const normalized = name.toLowerCase();
    return teams.find(
      (t) =>
        t.name.toLowerCase() === normalized ||
        t.shortName.toLowerCase() === normalized,
    );
  }

  async byLeague(league: League): Promise<Team[]> {
    return this.list(undefined, league);
  }

  async rivals(teamId: string): Promise<Team[]> {
    const team = await this.byId(teamId);
    return this.list(team.sport, team.league as League);
  }
}
