import type { Plugin } from '../plugins/plugin.js';
import { Logger } from '../logger.js';

export class PluginLifecycle {
  private logger = new Logger({ prefix: 'PluginLifecycle' });

  async installAndStart(plugin: Plugin): Promise<void> {
    this.logger.info(`Installing ${plugin.name}`);
    await plugin.install();
    this.logger.info(`Starting ${plugin.name}`);
    await plugin.start();
  }

  async stopAndUninstall(plugin: Plugin): Promise<void> {
    this.logger.info(`Stopping ${plugin.name}`);
    await plugin.stop();
    this.logger.info(`Uninstalling ${plugin.name}`);
    await plugin.uninstall();
  }

  async restart(plugin: Plugin): Promise<void> {
    await plugin.stop();
    await plugin.start();
  }
}
