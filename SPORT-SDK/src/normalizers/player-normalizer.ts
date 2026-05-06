import { Player, Sport } from '../types.js';

export interface RawPlayer {
  id: string | number;
  name: string;
  teamId: string | number;
  sport: string;
  position?: string;
  age?: number;
  nationality?: string;
  status?: string;
  injuryNote?: string;
}

export class PlayerNormalizer {
  normalize(raw: RawPlayer, providerPrefix: string): Player {
    const available = this.parseAvailability(raw.status);

    return {
      id: `${providerPrefix}-player-${raw.id}`,
      name: raw.name,
      teamId: `${providerPrefix}-team-${raw.teamId}`,
      sport: raw.sport as Sport,
      position: raw.position ?? 'Unknown',
      age: raw.age,
      nationality: raw.nationality,
      available,
      injuryNote: raw.injuryNote,
    };
  }

  private parseAvailability(status?: string): boolean {
    if (!status) return true;
    const lower = status.toLowerCase();
    return !['injured', 'suspended', 'unavailable', 'out'].some((s) => lower.includes(s));
  }

  buildId(providerPrefix: string, rawId: string | number): string {
    return `${providerPrefix}-player-${rawId}`;
  }
}
