import { BasePlugin } from 'wmarket-prediction-sdk';
import { PluginManager } from 'wmarket-prediction-sdk';

class StarterPlugin extends BasePlugin {
  readonly name = 'starter-plugin';
  readonly version = '1.0.0';
  readonly description = 'A starter template plugin';
  readonly capabilities = ['strategy'];

  async start(): Promise<void> {
    console.log('[StarterPlugin] Started — add your logic here');
  }

  async stop(): Promise<void> {
    console.log('[StarterPlugin] Stopped');
  }
}

const manager = new PluginManager();
await manager.install(new StarterPlugin());
await manager.start('starter-plugin');
console.log('Plugins:', manager.listAll());
await manager.stop('starter-plugin');
