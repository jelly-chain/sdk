export interface BackoffOptions {
  baseMs?: number;
  maxMs?: number;
  factor?: number;
  jitter?: boolean;
}

export function computeBackoff(attempt: number, options: BackoffOptions = {}): number {
  const base = options.baseMs ?? 500;
  const max = options.maxMs ?? 30_000;
  const factor = options.factor ?? 2;
  const delay = Math.min(base * Math.pow(factor, attempt), max);
  if (options.jitter) {
    return delay * (0.5 + Math.random() * 0.5);
  }
  return delay;
}

export async function sleepWithBackoff(attempt: number, options?: BackoffOptions): Promise<void> {
  const ms = computeBackoff(attempt, options);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
