import { describe, it, expect } from 'vitest';
import { KeywordPlugin } from '../../src/plugins/builtins/keyword-plugin.js';

describe('Plugin API contract', () => {
  it('should implement all required plugin interface methods', async () => {
    const plugin = new KeywordPlugin();
    expect(typeof plugin.name).toBe('string');
    expect(typeof plugin.version).toBe('string');
    expect(typeof plugin.description).toBe('string');
    expect(Array.isArray(plugin.capabilities)).toBe(true);
    expect(typeof plugin.install).toBe('function');
    expect(typeof plugin.start).toBe('function');
    expect(typeof plugin.stop).toBe('function');
    expect(typeof plugin.uninstall).toBe('function');
  });

  it('should complete lifecycle without throwing', async () => {
    const plugin = new KeywordPlugin();
    await expect(plugin.install()).resolves.toBeUndefined();
    await expect(plugin.start()).resolves.toBeUndefined();
    await expect(plugin.stop()).resolves.toBeUndefined();
    await expect(plugin.uninstall()).resolves.toBeUndefined();
  });
});
