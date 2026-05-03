import { describe, it, expect } from 'vitest';
import { validateEvent } from '../../src/schemas/event.schema.js';
import { createEventPayload } from '../../src/events.js';

describe('Event schema contract', () => {
  it('should validate a well-formed event', () => {
    const event = createEventPayload('bridge_activity', 'bsc', { volumeUSD: 1_000_000 }, 'mcp');
    const { valid, errors } = validateEvent(event);
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it('should reject an event without required fields', () => {
    const { valid } = validateEvent({ type: 'test' });
    expect(valid).toBe(false);
  });
});
