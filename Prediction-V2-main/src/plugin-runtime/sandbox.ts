import type { Plugin } from '../plugins/plugin.js';
import { Logger } from '../logger.js';

export class PluginSandbox {
  private logger = new Logger({ prefix: 'PluginSandbox' });
  private allowedCapabilities: Set<string>;

  constructor(allowedCapabilities: string[] = []) {
    this.allowedCapabilities = new Set(allowedCapabilities);
  }

  async execute<T>(plugin: Plugin, fn: (p: Plugin) => Promise<T>): Promise<T> {
    this.enforceCapabilities(plugin);
    this.logger.debug(`Executing plugin: ${plugin.name}`);
    try {
      return await fn(plugin);
    } catch (err) {
      this.logger.error(`Plugin ${plugin.name} threw an error`, err);
      throw err;
    }
  }

  private enforceCapabilities(plugin: Plugin): void {
    for (const cap of plugin.capabilities) {
      if (!this.allowedCapabilities.has(cap)) {
        throw new Error(`Plugin "${plugin.name}" requires capability "${cap}" which is not allowed`);
      }
    }
  }
}
