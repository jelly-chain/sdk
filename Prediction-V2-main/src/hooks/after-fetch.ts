import type { MarketSignal } from '../types.js';

export type AfterFetchHook = (signals: MarketSignal[]) => MarketSignal[] | Promise<MarketSignal[]>;

const hooks: AfterFetchHook[] = [];

export function registerAfterFetch(hook: AfterFetchHook): void {
  hooks.push(hook);
}

export async function runAfterFetchHooks(signals: MarketSignal[]): Promise<MarketSignal[]> {
  let current = signals;
  for (const hook of hooks) {
    current = await hook(current);
  }
  return current;
}

export function clearAfterFetchHooks(): void {
  hooks.length = 0;
}
