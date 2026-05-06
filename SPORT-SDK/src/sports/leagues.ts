import { Sport, League } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export interface LeagueInfo {
  id: League;
  name: string;
  sport: Sport;
  country: string;
  currentSeason: string;
  teamsCount: number;
  hasPromotion: boolean;
  hasRelegation: boolean;
}

const LEAGUE_CATALOG: LeagueInfo[] = [
  { id: 'premier-league', name: 'Premier League', sport: 'football', country: 'England', currentSeason: '2025/2026', teamsCount: 20, hasPromotion: true, hasRelegation: true },
  { id: 'la-liga', name: 'La Liga', sport: 'football', country: 'Spain', currentSeason: '2025/2026', teamsCount: 20, hasPromotion: true, hasRelegation: true },
  { id: 'bundesliga', name: 'Bundesliga', sport: 'football', country: 'Germany', currentSeason: '2025/2026', teamsCount: 18, hasPromotion: true, hasRelegation: true },
  { id: 'serie-a', name: 'Serie A', sport: 'football', country: 'Italy', currentSeason: '2025/2026', teamsCount: 20, hasPromotion: true, hasRelegation: true },
  { id: 'ligue-1', name: 'Ligue 1', sport: 'football', country: 'France', currentSeason: '2025/2026', teamsCount: 18, hasPromotion: true, hasRelegation: true },
  { id: 'champions-league', name: 'UEFA Champions League', sport: 'football', country: 'Europe', currentSeason: '2025/2026', teamsCount: 32, hasPromotion: false, hasRelegation: false },
  { id: 'mls', name: 'Major League Soccer', sport: 'football', country: 'USA', currentSeason: '2026', teamsCount: 30, hasPromotion: false, hasRelegation: false },
  { id: 'fifa-world-cup', name: 'FIFA World Cup', sport: 'football', country: 'International', currentSeason: '2026', teamsCount: 48, hasPromotion: false, hasRelegation: false },
  { id: 'nba', name: 'NBA', sport: 'basketball', country: 'USA', currentSeason: '2025/2026', teamsCount: 30, hasPromotion: false, hasRelegation: false },
  { id: 'nfl', name: 'NFL', sport: 'american-football', country: 'USA', currentSeason: '2025', teamsCount: 32, hasPromotion: false, hasRelegation: false },
  { id: 'mlb', name: 'MLB', sport: 'baseball', country: 'USA', currentSeason: '2026', teamsCount: 30, hasPromotion: false, hasRelegation: false },
  { id: 'nhl', name: 'NHL', sport: 'ice-hockey', country: 'USA/Canada', currentSeason: '2025/2026', teamsCount: 32, hasPromotion: false, hasRelegation: false },
  { id: 'atp', name: 'ATP Tour', sport: 'tennis', country: 'International', currentSeason: '2026', teamsCount: 0, hasPromotion: false, hasRelegation: false },
  { id: 'wta', name: 'WTA Tour', sport: 'tennis', country: 'International', currentSeason: '2026', teamsCount: 0, hasPromotion: false, hasRelegation: false },
  { id: 'ufc', name: 'UFC', sport: 'mma', country: 'International', currentSeason: '2026', teamsCount: 0, hasPromotion: false, hasRelegation: false },
  { id: 'f1', name: 'Formula 1', sport: 'formula1', country: 'International', currentSeason: '2026', teamsCount: 10, hasPromotion: false, hasRelegation: false },
];

export class LeaguesModule {
  constructor(private readonly cache: MemoryCache) {}

  async list(sport?: Sport): Promise<LeagueInfo[]> {
    if (sport) return LEAGUE_CATALOG.filter((l) => l.sport === sport);
    return [...LEAGUE_CATALOG];
  }

  async byId(id: League): Promise<LeagueInfo | undefined> {
    return LEAGUE_CATALOG.find((l) => l.id === id);
  }

  async bySport(sport: Sport): Promise<LeagueInfo[]> {
    return LEAGUE_CATALOG.filter((l) => l.sport === sport);
  }

  async currentSeason(league: League): Promise<string> {
    const info = await this.byId(league);
    return info?.currentSeason ?? new Date().getFullYear().toString();
  }
}
