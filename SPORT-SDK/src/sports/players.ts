import { Player, Sport } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';
import { NotFoundError } from '../errors.js';

export class PlayersModule {
  constructor(private readonly cache: MemoryCache) {}

  async byId(id: string): Promise<Player> {
    const cached = this.cache.get<Player>(`player:${id}`);
    if (cached) return cached;
    throw new NotFoundError('Player', id);
  }

  async byTeam(teamId: string): Promise<Player[]> {
    const key = `players:team:${teamId}`;
    return this.cache.get<Player[]>(key) ?? [];
  }

  async byName(name: string, teamId?: string): Promise<Player | undefined> {
    const players = teamId ? await this.byTeam(teamId) : [];
    const normalized = name.toLowerCase();
    return players.find((p) => p.name.toLowerCase().includes(normalized));
  }

  async unavailable(teamId: string): Promise<Player[]> {
    const players = await this.byTeam(teamId);
    return players.filter((p) => !p.available);
  }

  async available(teamId: string): Promise<Player[]> {
    const players = await this.byTeam(teamId);
    return players.filter((p) => p.available);
  }

  async topScorers(sport: Sport, limit = 10): Promise<Player[]> {
    const key = `players:top-scorers:${sport}`;
    const cached = this.cache.get<Player[]>(key);
    if (cached) return cached.slice(0, limit);
    return [];
  }
}
