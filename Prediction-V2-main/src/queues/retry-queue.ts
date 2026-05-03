export interface RetryItem<T = unknown> {
  id: string;
  payload: T;
  attempts: number;
  nextRetryAt: number;
  error?: string;
}

export class RetryQueue<T = unknown> {
  private items: Map<string, RetryItem<T>> = new Map();
  private maxAttempts: number;
  private baseDelayMs: number;

  constructor(options: { maxAttempts?: number; baseDelayMs?: number } = {}) {
    this.maxAttempts = options.maxAttempts ?? 5;
    this.baseDelayMs = options.baseDelayMs ?? 1_000;
  }

  add(id: string, payload: T, error?: string): boolean {
    const existing = this.items.get(id);
    const attempts = (existing?.attempts ?? 0) + 1;
    if (attempts > this.maxAttempts) return false;
    const delay = this.baseDelayMs * Math.pow(2, attempts - 1);
    this.items.set(id, { id, payload, attempts, nextRetryAt: Date.now() + delay, error });
    return true;
  }

  getReady(): RetryItem<T>[] {
    const now = Date.now();
    return [...this.items.values()].filter((item) => item.nextRetryAt <= now);
  }

  remove(id: string): void {
    this.items.delete(id);
  }

  size(): number {
    return this.items.size;
  }
}
