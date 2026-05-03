import type { SkillConfig } from '../config.js';

export const AGGRESSIVE_PRESET: Partial<SkillConfig['defaults']> = {
  chains: ['ethereum', 'bsc', 'base', 'polygon', 'arbitrum'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: false,
  logLevel: 'debug',
  confidenceThreshold: 0.4,
  riskTolerance: 'high',
};
