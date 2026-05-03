interface RateLimitEntry {
  count: number;
  windowStart: number;
}

export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private store = new Map<string, RateLimitEntry>();

  constructor(options: { windowMs?: number; maxRequests?: number } = {}) {
    this.windowMs = options.windowMs ?? 60_000;
    this.maxRequests = options.maxRequests ?? 60;
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now - entry.windowStart > this.windowMs) {
      this.store.set(identifier, { count: 1, windowStart: now });
      return { allowed: true, remaining: this.maxRequests - 1, resetAt: now + this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetAt: entry.windowStart + this.windowMs };
    }

    entry.count++;
    return { allowed: true, remaining: this.maxRequests - entry.count, resetAt: entry.windowStart + this.windowMs };
  }

  reset(identifier: string): void {
    this.store.delete(identifier);
  }
}
