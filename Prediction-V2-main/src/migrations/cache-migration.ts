export interface CacheMigrationOptions {
  fromFormat: string;
  toFormat: string;
}

export class CacheMigrationRunner {
  async migrate(
    entries: Array<{ key: string; value: unknown }>,
    transform: (value: unknown, key: string) => unknown,
  ): Promise<Array<{ key: string; value: unknown }>> {
    return entries.map(({ key, value }) => ({ key, value: transform(value, key) }));
  }

  v1ToV2(entry: Record<string, unknown>): Record<string, unknown> {
    return {
      ...entry,
      _version: '2',
      _migratedAt: new Date().toISOString(),
    };
  }
}
