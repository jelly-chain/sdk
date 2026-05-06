import { AbstractProvider } from '../base-provider.js';
import { TsdbTeam, TsdbEvent, TsdbPlayer, TsdbLeague } from './types.js';

export interface TheSportsDbConfig {
  apiKey?: string;
  enabled?: boolean;
}

export class TheSportsDbClient extends AbstractProvider {
  override readonly name = 'TheSportsDB';
  override readonly enabled: boolean;
  private readonly apiKey: string;

  constructor(config: TheSportsDbConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['THESPORTSDB_PATREON_KEY'] ?? '3';
    this.enabled = config.enabled !== false;
  }

  private get baseUrl(): string {
    return `https://www.thesportsdb.com/api/v1/json/${this.apiKey}`;
  }

  async searchTeam(name: string): Promise<{ teams: TsdbTeam[] | null }> {
    return this.get(`${this.baseUrl}/searchteams.php?t=${encodeURIComponent(name)}`);
  }

  async searchPlayer(name: string): Promise<{ player: TsdbPlayer[] | null }> {
    return this.get(`${this.baseUrl}/searchplayers.php?p=${encodeURIComponent(name)}`);
  }

  async getEventsByLeague(leagueId: string, season: string): Promise<{ events: TsdbEvent[] | null }> {
    return this.get(`${this.baseUrl}/eventsseason.php?id=${leagueId}&s=${season}`);
  }

  async getAllLeagues(): Promise<{ leagues: TsdbLeague[] | null }> {
    return this.get(`${this.baseUrl}/all_leagues.php`);
  }
}
