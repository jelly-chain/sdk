export const INPUT_SCHEMA = {
  type: 'object',
  properties: {
    keyword: { type: 'string', minLength: 1 },
    token: { type: 'string', minLength: 1 },
    chain: { type: 'string', enum: ['ethereum', 'bsc', 'base', 'polygon', 'arbitrum', 'optimism', 'avalanche'] },
    timeframe: { type: 'string', enum: ['1m', '5m', '15m', '1h', '4h', '1d', '1w'] },
    context: { type: 'object' },
    triggers: { type: 'array', items: { type: 'string' } },
    strategies: { type: 'array', items: { type: 'string' } },
  },
  additionalProperties: false,
} as const;

export function validateInput(input: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof input !== 'object' || input === null) {
    errors.push('Input must be a non-null object');
    return { valid: false, errors };
  }
  return { valid: errors.length === 0, errors };
}
