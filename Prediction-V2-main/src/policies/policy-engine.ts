import type { PredictionOutput } from '../types.js';
import { RiskPolicy } from './risk-policy.js';
import { ConfidencePolicy } from './confidence-policy.js';
import { EmitPolicy } from './emit-policy.js';

export class PolicyEngine {
  private riskPolicy = new RiskPolicy();
  private confidencePolicy = new ConfidencePolicy();
  private emitPolicy = new EmitPolicy();

  async evaluate(output: PredictionOutput): Promise<boolean> {
    if (!this.riskPolicy.check(output)) return false;
    if (!this.confidencePolicy.check(output)) return false;
    if (!this.emitPolicy.check(output)) return false;
    return true;
  }

  async evaluateWithReason(output: PredictionOutput): Promise<{ allowed: boolean; reason?: string }> {
    if (!this.riskPolicy.check(output)) return { allowed: false, reason: 'Risk score too high' };
    if (!this.confidencePolicy.check(output)) return { allowed: false, reason: 'Confidence too low' };
    if (!this.emitPolicy.check(output)) return { allowed: false, reason: 'Emit policy blocked' };
    return { allowed: true };
  }
}
