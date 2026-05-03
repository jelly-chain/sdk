# Plugin Development Guide

## Plugin Contract

All plugins must implement the `Plugin` interface:

```ts
interface Plugin {
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  install(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  uninstall(): Promise<void>;
}
```

## Writing a Plugin

```ts
import { BasePlugin } from 'wmarket-prediction-sdk';

export default class MyPlugin extends BasePlugin {
  name = 'my-plugin';
  version = '1.0.0';
  description = 'My custom prediction plugin';
  capabilities = ['strategy'];

  async start() {
    console.log('MyPlugin started');
  }
}
```

## Plugin Manager

```ts
import { PluginManager } from 'wmarket-prediction-sdk';

const manager = new PluginManager();
await manager.install(new MyPlugin());
await manager.start('my-plugin');
console.log(manager.listAll());
```

## Built-in Plugins

- `builtin-keyword` — Keyword trigger plugin.
- `builtin-event` — Event trigger plugin.
- `builtin-sentiment` — Sentiment normalization plugin.
