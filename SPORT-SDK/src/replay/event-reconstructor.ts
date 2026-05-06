import { MatchEvent, Fixture } from '../types.js';
import { ReplayEngine, ReplayFrame } from './replay-engine.js';

export interface MatchState {
  minute: number;
  homeScore: number;
  awayScore: number;
  homeTeamId: string;
  awayTeamId: string;
  eventsUpToNow: MatchEvent[];
  keyEvents: MatchEvent[];
}

export class EventReconstructor {
  private readonly engine = new ReplayEngine();

  reconstructAt(fixture: Fixture, events: MatchEvent[], minute: number): MatchState {
    const frames = this.engine.buildFrames(fixture, events);
    const frame = this.engine.getFrameAt(frames, minute) ?? {
      minute,
      homeScore: 0,
      awayScore: 0,
      events: [],
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
    };

    const upTo = events.filter((e) => (e.minute ?? 0) <= minute);
    const keyEvents = upTo.filter((e) =>
      e.type === 'goal' || e.type === 'red_card' || e.type === 'penalty',
    );

    return {
      minute,
      homeScore: frame.homeScore,
      awayScore: frame.awayScore,
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
      eventsUpToNow: upTo,
      keyEvents,
    };
  }

  allKeyMoments(events: MatchEvent[]): MatchEvent[] {
    return events
      .filter((e) => e.type === 'goal' || e.type === 'red_card' || e.type === 'penalty' || e.type === 'own_goal')
      .sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));
  }
}
