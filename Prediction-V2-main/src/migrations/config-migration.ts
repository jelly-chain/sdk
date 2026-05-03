export interface MigrationStep {
  fromVersion: string;
  toVersion: string;
  migrate: (config: Record<string, unknown>) => Record<string, unknown>;
}

const CONFIG_MIGRATIONS: MigrationStep[] = [
  {
    fromVersion: '1.0.0',
    toVersion: '2.0.0',
    migrate: (config) => {
      const v2 = { ...config };
      if (config['dataSources'] && !config['providers']) {
        v2['providers'] = (config['dataSources'] as string[]).map((name: string) => ({ name, type: name }));
        delete v2['dataSources'];
      }
      if (!v2['chains']) v2['chains'] = ['ethereum', 'bsc'];
      return v2;
    },
  },
];

export function migrateConfig(config: Record<string, unknown>, fromVersion: string, toVersion: string): Record<string, unknown> {
  let current = { ...config };
  for (const step of CONFIG_MIGRATIONS) {
    if (step.fromVersion === fromVersion && step.toVersion === toVersion) {
      current = step.migrate(current);
    }
  }
  return current;
}
