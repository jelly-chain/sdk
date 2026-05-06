import { Fixture, Standing } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export interface HistoricalSnapshot {
  league: string;
  season: string;
  asOfDate: string;
  fixtures: Fixture[];
  standings: Standing[];
}

export class HistoricalLoader {
  private readonly snapshots: Map<string, HistoricalSnapshot> = new Map();

  constructor(private readonly cache: MemoryCache) {}

  register(snapshot: HistoricalSnapshot): void {
    const key = `${snapshot.league}:${snapshot.season}`;
    this.snapshots.set(key, snapshot);

    for (const fixture of snapshot.fixtures) {
      this.cache.set(`fixture:${fixture.id}`, fixture);
    }
    this.cache.set(`standings:${snapshot.league}:${snapshot.season}`, snapshot.standings);
  }

  get(league: string, season: string): HistoricalSnapshot | undefined {
    return this.snapshots.get(`${league}:${season}`);
  }

  list(): HistoricalSnapshot[] {
    return [...this.snapshots.values()];
  }

  clear(): void {
    this.snapshots.clear();
    this.cache.clear();
  }
}
