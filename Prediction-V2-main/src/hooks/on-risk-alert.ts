import type { RiskProfile } from '../types.js';

export type OnRiskAlertHook = (risk: RiskProfile) => void | Promise<void>;

const hooks: OnRiskAlertHook[] = [];

export function registerOnRiskAlert(hook: OnRiskAlertHook): void {
  hooks.push(hook);
}

export async function runOnRiskAlertHooks(risk: RiskProfile): Promise<void> {
  for (const hook of hooks) {
    await hook(risk);
  }
}

export function clearOnRiskAlertHooks(): void {
  hooks.length = 0;
}
