import { MatchEvent } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export class MatchEventsModule {
  constructor(private readonly cache: MemoryCache) {}

  async byMatch(fixtureId: string): Promise<MatchEvent[]> {
    return this.cache.get<MatchEvent[]>(`events:${fixtureId}`) ?? [];
  }

  async goals(fixtureId: string): Promise<MatchEvent[]> {
    const events = await this.byMatch(fixtureId);
    return events.filter((e) => e.type === 'goal' || e.type === 'own_goal');
  }

  async redCards(fixtureId: string): Promise<MatchEvent[]> {
    const events = await this.byMatch(fixtureId);
    return events.filter((e) => e.type === 'red_card');
  }

  async byPlayer(playerId: string, fixtureId: string): Promise<MatchEvent[]> {
    const events = await this.byMatch(fixtureId);
    return events.filter((e) => e.playerId === playerId);
  }

  async keyMoments(fixtureId: string): Promise<MatchEvent[]> {
    const events = await this.byMatch(fixtureId);
    return events.filter(
      (e) => e.type === 'goal' || e.type === 'red_card' || e.type === 'penalty',
    );
  }
}
