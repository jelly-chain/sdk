import type { Role } from './roles.js';

export const CAPABILITIES = {
  PREDICT: 'predict',
  READ_AUDIT: 'read_audit',
  WRITE_AUDIT: 'write_audit',
  READ_METRICS: 'read_metrics',
  MANAGE_PLUGINS: 'manage_plugins',
  MANAGE_CONFIG: 'manage_config',
  ADMIN: 'admin',
} as const;

export type Capability = (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

export const ROLE_CAPABILITIES: Record<Role, Capability[]> = {
  anonymous: [],
  reader: ['read_metrics', 'read_audit'],
  predictor: ['predict', 'read_metrics'],
  auditor: ['read_audit', 'write_audit', 'read_metrics'],
  admin: ['predict', 'read_audit', 'write_audit', 'read_metrics', 'manage_plugins', 'manage_config', 'admin'],
};

export function getCapabilitiesForRole(role: Role): Capability[] {
  return ROLE_CAPABILITIES[role] ?? [];
}
