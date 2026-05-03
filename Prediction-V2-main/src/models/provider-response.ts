export interface ProviderResponseModel<T = unknown> {
  provider: string;
  success: boolean;
  data: T | null;
  error?: string;
  statusCode?: number;
  latencyMs: number;
  timestamp: string;
  cached: boolean;
}

export function wrapProviderResponse<T>(
  provider: string,
  data: T | null,
  latencyMs: number,
  error?: string,
  statusCode?: number,
): ProviderResponseModel<T> {
  return {
    provider,
    success: data !== null && error === undefined,
    data,
    error,
    statusCode,
    latencyMs,
    timestamp: new Date().toISOString(),
    cached: false,
  };
}
