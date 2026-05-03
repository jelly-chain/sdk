export const EVENT_SCHEMA = {
  type: 'object',
  required: ['id', 'type', 'chain', 'data', 'timestamp', 'source'],
  properties: {
    id: { type: 'string' },
    type: { type: 'string' },
    chain: { type: 'string' },
    contractAddress: { type: 'string' },
    blockNumber: { type: 'number' },
    txHash: { type: 'string' },
    data: { type: 'object' },
    timestamp: { type: 'string' },
    source: { type: 'string' },
    processed: { type: 'boolean' },
  },
} as const;

export function validateEvent(event: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof event !== 'object' || event === null) {
    errors.push('Event must be a non-null object');
    return { valid: false, errors };
  }
  const e = event as Record<string, unknown>;
  if (!e['id']) errors.push('event.id is required');
  if (!e['type']) errors.push('event.type is required');
  if (!e['chain']) errors.push('event.chain is required');
  return { valid: errors.length === 0, errors };
}
