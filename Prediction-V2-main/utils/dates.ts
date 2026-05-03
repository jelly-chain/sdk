export function toTimestamp(value: string | number | Date): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  return new Date(value).getTime();
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function addMs(base: Date | string, ms: number): Date {
  return new Date(toTimestamp(base) + ms);
}

export function subtractMs(base: Date | string, ms: number): Date {
  return new Date(toTimestamp(base) - ms);
}

export function windowStart(windowMs: number): Date {
  return new Date(Math.floor(Date.now() / windowMs) * windowMs);
}

export function parseTimeframe(tf: string): number {
  const units: Record<string, number> = {
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
    w: 604_800_000,
  };
  const match = tf.match(/^(\d+)([mhdw])$/);
  if (!match || !match[1] || !match[2]) throw new Error(`Invalid timeframe: ${tf}`);
  return parseInt(match[1], 10) * (units[match[2]] ?? 0);
}

export function isWithinWindow(timestamp: string | number, windowMs: number): boolean {
  return Date.now() - toTimestamp(timestamp) <= windowMs;
}
