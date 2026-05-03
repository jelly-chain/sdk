export interface SchemaMigration {
  id: string;
  description: string;
  apply: (data: unknown) => unknown;
  rollback?: (data: unknown) => unknown;
}

export class SchemaMigrationRunner {
  private migrations: SchemaMigration[] = [];

  register(migration: SchemaMigration): void {
    this.migrations.push(migration);
  }

  apply(data: unknown, fromId?: string): unknown {
    const start = fromId ? this.migrations.findIndex((m) => m.id === fromId) + 1 : 0;
    let current = data;
    for (const migration of this.migrations.slice(start)) {
      current = migration.apply(current);
    }
    return current;
  }

  listMigrations(): { id: string; description: string }[] {
    return this.migrations.map(({ id, description }) => ({ id, description }));
  }
}
