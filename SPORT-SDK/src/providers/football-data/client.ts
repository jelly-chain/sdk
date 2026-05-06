import { AbstractProvider } from '../base-provider.js';
import { FdTeam, FdMatch, FdStanding } from './types.js';

export interface FootballDataConfig {
  apiKey?: string;
  enabled?: boolean;
}

export class FootballDataClient extends AbstractProvider {
  override readonly name = 'football-data.org';
  override readonly enabled: boolean;
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.football-data.org/v4';

  constructor(config: FootballDataConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['FOOTBALL_DATA_API_KEY'] ?? '';
    this.enabled = !!(config.enabled !== false && this.apiKey);
  }

  private headers(): Record<string, string> {
    return { 'X-Auth-Token': this.apiKey };
  }

  async getCompetitionMatches(code: string, params: { matchday?: number; status?: string } = {}): Promise<{ matches: FdMatch[] }> {
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])));
    return this.get(`${this.baseUrl}/competitions/${code}/matches?${qs}`, this.headers());
  }

  async getCompetitionStandings(code: string): Promise<{ standings: Array<{ table: FdStanding[] }> }> {
    return this.get(`${this.baseUrl}/competitions/${code}/standings`, this.headers());
  }

  async getTeam(id: number): Promise<FdTeam> {
    return this.get<FdTeam>(`${this.baseUrl}/teams/${id}`, this.headers());
  }
}
