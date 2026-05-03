import { describe, it, expect } from 'vitest';
import { EventTrigger } from '../../../src/triggers/event-trigger.js';
import type { EventPayload } from '../../../src/types.js';

describe('EventTrigger', () => {
  const event: EventPayload = {
    id: 'evt_1',
    type: 'bridge_activity',
    chain: 'bsc',
    data: { volumeUSD: 2_000_000 },
    timestamp: new Date().toISOString(),
    source: 'test',
  };

  it('should trigger on matching event type', () => {
    const trigger = new EventTrigger([{ eventType: 'bridge_activity' }]);
    expect(trigger.evaluate(event)).toBe(true);
  });

  it('should not trigger on non-matching event type', () => {
    const trigger = new EventTrigger([{ eventType: 'protocol_launch' }]);
    expect(trigger.evaluate(event)).toBe(false);
  });

  it('should filter by chain', () => {
    const trigger = new EventTrigger([{ eventType: 'bridge_activity', chain: 'ethereum' }]);
    expect(trigger.evaluate(event)).toBe(false);
  });
});
