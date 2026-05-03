export const PROVIDER_SCHEMA = {
  type: 'object',
  required: ['name', 'type'],
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    apiKey: { type: 'string' },
    baseUrl: { type: 'string' },
    timeout: { type: 'number', minimum: 0 },
    retries: { type: 'number', minimum: 0, maximum: 10 },
  },
} as const;

export function validateProviderConfig(provider: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof provider !== 'object' || provider === null) {
    errors.push('Provider config must be a non-null object');
    return { valid: false, errors };
  }
  const p = provider as Record<string, unknown>;
  if (!p['name']) errors.push('provider.name is required');
  if (!p['type']) errors.push('provider.type is required');
  return { valid: errors.length === 0, errors };
}
