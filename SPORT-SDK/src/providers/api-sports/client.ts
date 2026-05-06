import { AbstractProvider } from '../base-provider.js';
import { ApiSportsResponse, ApiSportsTeam, ApiSportsFixture, ApiSportsStanding } from './types.js';

export interface ApiSportsConfig {
  apiKey?: string;
  enabled?: boolean;
  sport?: 'football' | 'basketball' | 'baseball' | 'hockey' | 'american-football';
}

export class ApiSportsClient extends AbstractProvider {
  override readonly name = 'API-Sports';
  override readonly enabled: boolean;
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: ApiSportsConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['SPORTS_API_KEY'] ?? '';
    this.enabled = !!(config.enabled !== false && this.apiKey);
    const sport = config.sport ?? 'football';
    this.baseUrl = `https://v3.${sport}.api-sports.io`;
  }

  private headers(): Record<string, string> {
    return { 'x-apisports-key': this.apiKey };
  }

  async getTeams(params: { league?: number; season?: number } = {}): Promise<ApiSportsResponse<ApiSportsTeam>> {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    );
    return this.get<ApiSportsResponse<ApiSportsTeam>>(`${this.baseUrl}/teams?${qs}`, this.headers());
  }

  async getFixtures(params: { league?: number; season?: number; team?: number; date?: string } = {}): Promise<ApiSportsResponse<ApiSportsFixture>> {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    );
    return this.get<ApiSportsResponse<ApiSportsFixture>>(`${this.baseUrl}/fixtures?${qs}`, this.headers());
  }

  async getStandings(league: number, season: number): Promise<ApiSportsResponse<{ league: { standings: ApiSportsStanding[][] } }>> {
    return this.get(`${this.baseUrl}/standings?league=${league}&season=${season}`, this.headers());
  }
}
