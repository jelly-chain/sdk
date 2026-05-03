export interface Checkpoint {
  id: string;
  key: string;
  value: unknown;
  savedAt: string;
}

export class CheckpointStore {
  private checkpoints: Map<string, Checkpoint> = new Map();

  save(key: string, value: unknown): Checkpoint {
    const cp: Checkpoint = { id: `cp_${Date.now()}`, key, value, savedAt: new Date().toISOString() };
    this.checkpoints.set(key, cp);
    return cp;
  }

  load(key: string): Checkpoint | undefined {
    return this.checkpoints.get(key);
  }

  delete(key: string): void {
    this.checkpoints.delete(key);
  }

  listAll(): Checkpoint[] {
    return [...this.checkpoints.values()];
  }

  clear(): void {
    this.checkpoints.clear();
  }
}
