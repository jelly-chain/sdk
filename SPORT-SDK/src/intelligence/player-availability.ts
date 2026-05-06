import { Player } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export interface AvailabilityReport {
  teamId: string;
  fixtureId?: string;
  available: Player[];
  unavailable: Player[];
  suspended: Player[];
  availabilityRate: number;
}

export class PlayerAvailability {
  constructor(private readonly sports: SportsNamespace) {}

  async report(teamId: string, fixtureId?: string): Promise<AvailabilityReport> {
    const [available, unavailable] = await Promise.all([
      this.sports.players.available(teamId),
      this.sports.players.unavailable(teamId),
    ]);

    const suspended = unavailable.filter((p) => p.injuryNote?.toLowerCase().includes('suspend'));
    const total = available.length + unavailable.length;
    const availabilityRate = total > 0 ? available.length / total : 1;

    return { teamId, fixtureId, available, unavailable, suspended, availabilityRate };
  }

  async isKeyPlayerAvailable(playerId: string, teamId: string): Promise<boolean> {
    const available = await this.sports.players.available(teamId);
    return available.some((p) => p.id === playerId);
  }
}
