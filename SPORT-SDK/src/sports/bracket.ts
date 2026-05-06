import { BracketNode, MatchStage, League } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';

export class BracketModule {
  constructor(private readonly cache: MemoryCache) {}

  async current(league: League): Promise<BracketNode[]> {
    return this.cache.get<BracketNode[]>(`bracket:${league}`) ?? [];
  }

  async byRound(league: League, round: MatchStage): Promise<BracketNode[]> {
    const bracket = await this.current(league);
    return bracket.filter((n) => n.round === round);
  }

  async isEliminated(teamId: string, league: League): Promise<boolean> {
    const bracket = await this.current(league);
    const involved = bracket.filter((n) => n.homeTeamId === teamId || n.awayTeamId === teamId);
    if (involved.length === 0) return false;
    const latest = involved[involved.length - 1];
    return latest !== undefined && latest.winnerId !== undefined && latest.winnerId !== teamId;
  }

  async winner(league: League): Promise<string | undefined> {
    const bracket = await this.current(league);
    const finals = bracket.filter((n) => n.round === 'final');
    return finals[0]?.winnerId;
  }
}
