import type { SDKConfig } from '../../src/types.js';

export const TEST_CONFIG: SDKConfig = {
  chains: ['bsc', 'ethereum'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: false,
  enableAudit: false,
  logLevel: 'error',
};

export const MINIMAL_CONFIG: SDKConfig = {
  chains: ['bsc'],
};

export const FULL_CONFIG: SDKConfig = {
  chains: ['bsc', 'ethereum', 'base', 'polygon'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: true,
  enableTelemetry: false,
  enableAudit: true,
  enableReplay: true,
  logLevel: 'debug',
  cacheOptions: { ttlMs: 60_000, maxEntries: 500 },
  riskOptions: { maxRiskScore: 0.8, confidenceThreshold: 0.4, tolerance: 'medium' },
};
