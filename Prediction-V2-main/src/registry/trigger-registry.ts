class TriggerRegistry {
  private registry = new Map<string, unknown>();

  register(name: string, trigger: unknown): void {
    this.registry.set(name, trigger);
  }

  get(name: string): unknown {
    return this.registry.get(name);
  }

  has(name: string): boolean {
    return this.registry.has(name);
  }

  list(): string[] {
    return [...this.registry.keys()];
  }

  unregister(name: string): void {
    this.registry.delete(name);
  }
}

export const triggerRegistry = new TriggerRegistry();
