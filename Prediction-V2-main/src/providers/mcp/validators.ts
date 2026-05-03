import type { MCPTokenData } from './client.js';

export function validateTokenData(data: unknown): data is MCPTokenData {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return typeof d['address'] === 'string' && typeof d['symbol'] === 'string' && typeof d['price'] === 'number';
}
