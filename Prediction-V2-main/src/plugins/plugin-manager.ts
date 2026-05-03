import type { Plugin } from './plugin.js';
import { Logger } from '../logger.js';

type PluginState = 'installed' | 'running' | 'stopped' | 'error';

interface PluginEntry {
  plugin: Plugin;
  state: PluginState;
}

export class PluginManager {
  private plugins = new Map<string, PluginEntry>();
  private logger = new Logger({ prefix: 'PluginManager' });

  async install(plugin: Plugin): Promise<void> {
    this.logger.info(`Installing plugin: ${plugin.name}`);
    await plugin.install();
    this.plugins.set(plugin.name, { plugin, state: 'installed' });
  }

  async start(name: string): Promise<void> {
    const entry = this.plugins.get(name);
    if (!entry) throw new Error(`Plugin not found: ${name}`);
    await entry.plugin.start();
    entry.state = 'running';
    this.logger.info(`Plugin started: ${name}`);
  }

  async stop(name: string): Promise<void> {
    const entry = this.plugins.get(name);
    if (!entry) throw new Error(`Plugin not found: ${name}`);
    await entry.plugin.stop();
    entry.state = 'stopped';
  }

  async uninstall(name: string): Promise<void> {
    const entry = this.plugins.get(name);
    if (!entry) throw new Error(`Plugin not found: ${name}`);
    await entry.plugin.uninstall();
    this.plugins.delete(name);
  }

  getState(name: string): PluginState | undefined {
    return this.plugins.get(name)?.state;
  }

  listAll(): { name: string; state: PluginState; version: string }[] {
    return [...this.plugins.values()].map(({ plugin, state }) => ({
      name: plugin.name,
      state,
      version: plugin.version,
    }));
  }
}
