import type { Plugin } from './plugin.js';
import { Logger } from '../logger.js';

export class PluginLoader {
  private logger = new Logger({ prefix: 'PluginLoader' });

  async loadFromPath(path: string): Promise<Plugin> {
    this.logger.debug(`Loading plugin from path: ${path}`);
    const mod = await import(path);
    const PluginClass = mod.default ?? mod.Plugin;
    if (!PluginClass) throw new Error(`No default export found in plugin: ${path}`);
    return new PluginClass() as Plugin;
  }

  async loadMany(paths: string[]): Promise<Plugin[]> {
    const results = await Promise.allSettled(paths.map((p) => this.loadFromPath(p)));
    const plugins: Plugin[] = [];
    for (const [i, result] of results.entries()) {
      if (result.status === 'fulfilled') {
        plugins.push(result.value);
      } else {
        this.logger.warn(`Failed to load plugin at ${paths[i]}`, result.reason);
      }
    }
    return plugins;
  }
}
