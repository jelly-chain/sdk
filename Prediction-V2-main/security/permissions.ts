export type Capability = 'predict' | 'read_audit' | 'write_audit' | 'manage_plugins' | 'read_metrics' | 'admin';

export interface PermissionContext {
  role: string;
  capabilities: Capability[];
}

export function hasCapability(ctx: PermissionContext, capability: Capability): boolean {
  return ctx.capabilities.includes('admin') || ctx.capabilities.includes(capability);
}

export function requireCapability(ctx: PermissionContext, capability: Capability): void {
  if (!hasCapability(ctx, capability)) {
    throw new Error(`Permission denied: missing capability "${capability}" for role "${ctx.role}"`);
  }
}

export function createAnonymousContext(): PermissionContext {
  return { role: 'anonymous', capabilities: [] };
}

export function createAdminContext(): PermissionContext {
  return { role: 'admin', capabilities: ['admin'] };
}
