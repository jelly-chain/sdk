class ModelRegistry {
  private registry = new Map<string, unknown>();

  register(name: string, model: unknown): void {
    this.registry.set(name, model);
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
}

export const modelRegistry = new ModelRegistry();
