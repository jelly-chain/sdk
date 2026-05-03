export const CONFIG_SCHEMA = {
  type: 'object',
  required: ['chains'],
  properties: {
    chains: { type: 'array', items: { type: 'string' }, minItems: 1 },
    enableRiskAssessment: { type: 'boolean' },
    enableMetrics: { type: 'boolean' },
    enableCache: { type: 'boolean' },
    enableTelemetry: { type: 'boolean' },
    enableAudit: { type: 'boolean' },
    enableReplay: { type: 'boolean' },
    logLevel: { type: 'string', enum: ['debug', 'info', 'warn', 'error'] },
    cacheOptions: { type: 'object' },
    riskOptions: { type: 'object' },
    providers: { type: 'array' },
    plugins: { type: 'array', items: { type: 'string' } },
  },
} as const;

export function validateConfig(config: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof config !== 'object' || config === null) {
    errors.push('Config must be a non-null object');
    return { valid: false, errors };
  }
  const c = config as Record<string, unknown>;
  if (!Array.isArray(c['chains']) || (c['chains'] as unknown[]).length === 0) {
    errors.push('config.chains must be a non-empty array');
  }
  return { valid: errors.length === 0, errors };
}
