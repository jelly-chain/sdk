import type { Role } from './roles.js';
import type { Capability } from './capabilities.js';
import { getCapabilitiesForRole } from './capabilities.js';

export interface AccessContext {
  role: Role;
  extra?: Capability[];
}

export function can(ctx: AccessContext, capability: Capability): boolean {
  const roleCaps = getCapabilitiesForRole(ctx.role);
  const allCaps = [...roleCaps, ...(ctx.extra ?? [])];
  return allCaps.includes('admin') || allCaps.includes(capability);
}

export function require(ctx: AccessContext, capability: Capability): void {
  if (!can(ctx, capability)) {
    throw new Error(`Access denied: role "${ctx.role}" lacks capability "${capability}"`);
  }
}

export function createContext(role: Role, extra?: Capability[]): AccessContext {
  return { role, extra };
}
