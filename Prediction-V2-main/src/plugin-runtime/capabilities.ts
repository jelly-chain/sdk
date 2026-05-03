export const PLUGIN_CAPABILITIES = {
  KEYWORD_TRIGGER: 'keyword-trigger',
  EVENT_TRIGGER: 'event-trigger',
  SENTIMENT: 'sentiment',
  STRATEGY: 'strategy',
  PROVIDER: 'provider',
  AUDIT_WRITE: 'audit-write',
  METRICS_READ: 'metrics-read',
  STORAGE_READ: 'storage-read',
  STORAGE_WRITE: 'storage-write',
} as const;

export type PluginCapability = (typeof PLUGIN_CAPABILITIES)[keyof typeof PLUGIN_CAPABILITIES];

export function validateCapabilities(declared: string[]): { valid: boolean; unknown: string[] } {
  const known = new Set(Object.values(PLUGIN_CAPABILITIES));
  const unknown = declared.filter((c) => !known.has(c as PluginCapability));
  return { valid: unknown.length === 0, unknown };
}
