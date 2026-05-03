export const SCHEMA_VERSION = '2.0.0';

export interface VersionedSchema {
  version: string;
  schema: Record<string, unknown>;
}

export const SCHEMA_REGISTRY = new Map<string, VersionedSchema>();

export function registerSchema(name: string, version: string, schema: Record<string, unknown>): void {
  SCHEMA_REGISTRY.set(`${name}:${version}`, { version, schema });
}

export function getSchema(name: string, version = SCHEMA_VERSION): VersionedSchema | undefined {
  return SCHEMA_REGISTRY.get(`${name}:${version}`);
}
