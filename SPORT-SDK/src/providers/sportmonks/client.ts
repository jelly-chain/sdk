import { AbstractProvider } from '../base-provider.js';
import { SmResponse, SmTeam, SmFixture, SmStanding } from './types.js';

export interface SportmonksConfig {
  apiKey?: string;
  enabled?: boolean;
}

export class SportmonksClient extends AbstractProvider {
  override readonly name = 'Sportmonks';
  override readonly enabled: boolean;
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.sportmonks.com/v3/football';

  constructor(config: SportmonksConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['SPORTMONKS_API_KEY'] ?? '';
    this.enabled = !!(config.enabled !== false && this.apiKey);
  }

  private headers(): Record<string, string> {
    return { Authorization: this.apiKey };
  }

  async getFixtures(params: { league_id?: number; season_id?: number } = {}): Promise<SmResponse<SmFixture[]>> {
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])));
    return this.get<SmResponse<SmFixture[]>>(`${this.baseUrl}/fixtures?${qs}`, this.headers());
  }

  async getTeam(id: number): Promise<SmResponse<SmTeam>> {
    return this.get<SmResponse<SmTeam>>(`${this.baseUrl}/teams/${id}`, this.headers());
  }

  async getStandings(seasonId: number): Promise<SmResponse<SmStanding[]>> {
    return this.get<SmResponse<SmStanding[]>>(`${this.baseUrl}/standings/seasons/${seasonId}`, this.headers());
  }
}
