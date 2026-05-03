import type { LlamaFiProtocol } from './client.js';

export function validateProtocol(data: unknown): data is LlamaFiProtocol {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return typeof d['name'] === 'string' && typeof d['tvl'] === 'number' && Array.isArray(d['chains']);
}

export function validateProtocols(data: unknown): data is LlamaFiProtocol[] {
  return Array.isArray(data) && data.every(validateProtocol);
}
