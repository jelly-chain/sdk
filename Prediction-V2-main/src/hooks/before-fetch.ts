import type { PredictionInput } from '../types.js';

export type BeforeFetchHook = (input: PredictionInput) => PredictionInput | Promise<PredictionInput>;

const hooks: BeforeFetchHook[] = [];

export function registerBeforeFetch(hook: BeforeFetchHook): void {
  hooks.push(hook);
}

export async function runBeforeFetchHooks(input: PredictionInput): Promise<PredictionInput> {
  let current = input;
  for (const hook of hooks) {
    current = await hook(current);
  }
  return current;
}

export function clearBeforeFetchHooks(): void {
  hooks.length = 0;
}
