export function loadSecret(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Required environment variable "${key}" is not set`);
  }
  return value;
}

export function loadOptionalSecret(key: string): string | undefined {
  return process.env[key];
}

export function redactSecret(value: string, visibleChars = 4): string {
  if (value.length <= visibleChars) return '*'.repeat(value.length);
  return `${value.slice(0, visibleChars)}${'*'.repeat(Math.min(12, value.length - visibleChars))}`;
}

export function maskSecretsInObject(obj: Record<string, unknown>, secretKeys: string[]): Record<string, unknown> {
  const result = { ...obj };
  for (const key of secretKeys) {
    if (typeof result[key] === 'string') {
      result[key] = redactSecret(result[key] as string);
    }
  }
  return result;
}
