import type { SportsNamespace } from '../sdk.js';
import type { UpsetDetector } from './upset-detector.js';
import type { InjuryImpact } from './injury-impact.js';

/** Minimal dependency surface needed by NarrativeEngine — avoids circular coupling. */
export interface NarrativeEngineDeps {
  upsets: UpsetDetector;
  injuries: InjuryImpact;
}

export interface MatchNarrative {
  fixtureId: string;
  tags: string[];
  headline: string;
  subContext: string[];
}

export class NarrativeEngine {
  constructor(
    private readonly sports: SportsNamespace,
    private readonly intelligence: NarrativeEngineDeps,
  ) {}

  async forMatch(fixtureId: string): Promise<MatchNarrative> {
    const fixture = await this.sports.fixtures.byId(fixtureId).catch(() => null);
    if (!fixture) {
      return { fixtureId, tags: [], headline: 'Match context unavailable', subContext: [] };
    }

    const [upsets, homeInjuries, awayInjuries] = await Promise.all([
      this.intelligence.upsets.evaluate(fixtureId),
      this.intelligence.injuries.summary(fixture.homeTeamId),
      this.intelligence.injuries.summary(fixture.awayTeamId),
    ]);

    const tags: string[] = [];
    const subContext: string[] = [];

    if (upsets && upsets.riskLevel === 'high') tags.push('upset-alert');
    if (homeInjuries.riskFlags.length > 0) tags.push('home-injury-concern');
    if (awayInjuries.riskFlags.length > 0) tags.push('away-injury-concern');

    const headline = tags.length > 0
      ? `${tags.join(' · ')} — key context for this fixture`
      : 'Standard fixture — no major risk flags';

    return { fixtureId, tags, headline, subContext };
  }
}
