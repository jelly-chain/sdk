import type { PredictionInput } from '../types.js';

export type BeforePredictHook = (input: PredictionInput) => void | Promise<void>;

const hooks: BeforePredictHook[] = [];

export function registerBeforePredict(hook: BeforePredictHook): void {
  hooks.push(hook);
}

export async function runBeforePredictHooks(input: PredictionInput): Promise<void> {
  for (const hook of hooks) {
    await hook(input);
  }
}

export function clearBeforePredictHooks(): void {
  hooks.length = 0;
}
