export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withTimeout<T>(promise: Promise<T>, ms: number, label = 'operation'): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout: ${label} exceeded ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number,
  backoffFactor = 2,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await sleep(delayMs * Math.pow(backoffFactor, attempt));
      }
    }
  }
  throw lastError;
}

export async function allSettledMap<K extends string, V>(
  map: Record<K, () => Promise<V>>,
): Promise<Record<K, V | null>> {
  const entries = Object.entries(map) as [K, () => Promise<V>][];
  const results = await Promise.allSettled(entries.map(([, fn]) => fn()));
  return Object.fromEntries(
    entries.map(([key], i) => [key, results[i]?.status === 'fulfilled' ? (results[i] as PromiseFulfilledResult<V>).value : null]),
  ) as Record<K, V | null>;
}
