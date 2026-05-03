export interface PluginDependency {
  name: string;
  version: string;
  optional?: boolean;
}

export class DependencyResolver {
  resolve(plugins: { name: string; version: string; dependencies?: PluginDependency[] }[]): string[] {
    const available = new Map(plugins.map((p) => [p.name, p.version]));
    const loadOrder: string[] = [];
    const visited = new Set<string>();

    const visit = (name: string): void => {
      if (visited.has(name)) return;
      visited.add(name);
      const plugin = plugins.find((p) => p.name === name);
      if (!plugin) return;
      for (const dep of plugin.dependencies ?? []) {
        if (!available.has(dep.name)) {
          if (!dep.optional) throw new Error(`Missing required plugin dependency: "${dep.name}" for plugin "${name}"`);
          continue;
        }
        visit(dep.name);
      }
      loadOrder.push(name);
    };

    for (const plugin of plugins) visit(plugin.name);
    return loadOrder;
  }
}
