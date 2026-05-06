import { MatchEvent } from '../types.js';

export type RawEventType = string;

const EVENT_TYPE_MAP: Record<string, MatchEvent['type']> = {
  goal: 'goal', 'own goal': 'own_goal', 'own-goal': 'own_goal',
  'yellow card': 'yellow_card', 'red card': 'red_card',
  yellowcard: 'yellow_card', redcard: 'red_card',
  substitution: 'substitution', sub: 'substitution',
  penalty: 'penalty', touchdown: 'touchdown', basket: 'basket',
};

export interface RawEvent {
  id: string | number;
  fixtureId: string | number;
  type: RawEventType;
  minute?: number;
  period?: string;
  teamId: string | number;
  playerId?: string | number;
  assistPlayerId?: string | number;
  detail?: string;
}

export class EventNormalizer {
  normalize(raw: RawEvent, providerPrefix: string): MatchEvent {
    const normalizedType: MatchEvent['type'] =
      EVENT_TYPE_MAP[raw.type.toLowerCase()] ?? raw.type;

    return {
      id: `${providerPrefix}-event-${raw.id}`,
      fixtureId: String(raw.fixtureId),
      type: normalizedType,
      minute: raw.minute,
      period: raw.period,
      teamId: String(raw.teamId),
      playerId: raw.playerId ? String(raw.playerId) : undefined,
      assistPlayerId: raw.assistPlayerId ? String(raw.assistPlayerId) : undefined,
      detail: raw.detail,
    };
  }
}
