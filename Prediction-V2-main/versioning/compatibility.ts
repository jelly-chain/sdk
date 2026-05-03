import { parseVersion } from './api-version.js';

export type CompatibilityResult = { compatible: boolean; reason?: string };

export function checkCompatibility(fromVersion: string, toVersion: string): CompatibilityResult {
  const from = parseVersion(fromVersion);
  const to = parseVersion(toVersion);
  if (from.major !== to.major) {
    return { compatible: false, reason: `Major version mismatch: ${from.major} → ${to.major}. Breaking changes require migration.` };
  }
  if (from.minor > to.minor) {
    return { compatible: false, reason: `Client minor version (${from.minor}) exceeds SDK minor (${to.minor}).` };
  }
  return { compatible: true };
}

export function requireCompatibility(fromVersion: string, toVersion: string): void {
  const result = checkCompatibility(fromVersion, toVersion);
  if (!result.compatible) throw new Error(`Version incompatibility: ${result.reason}`);
}
