import { describe, it, expect } from 'vitest';
import { PluginManager } from '../../src/plugins/plugin-manager.js';
import { KeywordPlugin } from '../../src/plugins/builtins/keyword-plugin.js';
import { SentimentPlugin } from '../../src/plugins/builtins/sentiment-plugin.js';

describe('Plugin lifecycle flow', () => {
  it('should install, start, and stop plugins', async () => {
    const manager = new PluginManager();
    await manager.install(new KeywordPlugin());
    await manager.install(new SentimentPlugin());

    expect(manager.getState('builtin-keyword')).toBe('installed');

    await manager.start('builtin-keyword');
    expect(manager.getState('builtin-keyword')).toBe('running');

    await manager.stop('builtin-keyword');
    expect(manager.getState('builtin-keyword')).toBe('stopped');

    const all = manager.listAll();
    expect(all.length).toBe(2);
  });
});
