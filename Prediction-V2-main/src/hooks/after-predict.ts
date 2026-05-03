import type { PredictionOutput } from '../types.js';

export type AfterPredictHook = (output: PredictionOutput) => PredictionOutput | Promise<PredictionOutput>;

const hooks: AfterPredictHook[] = [];

export function registerAfterPredict(hook: AfterPredictHook): void {
  hooks.push(hook);
}

export async function runAfterPredictHooks(output: PredictionOutput): Promise<PredictionOutput> {
  let current = output;
  for (const hook of hooks) {
    current = await hook(current);
  }
  return current;
}

export function clearAfterPredictHooks(): void {
  hooks.length = 0;
}
