export interface DeadLetterItem<T = unknown> {
  id: string;
  payload: T;
  reason: string;
  attempts: number;
  failedAt: string;
}

export class DeadLetterQueue<T = unknown> {
  private items: DeadLetterItem<T>[] = [];
  private maxSize: number;

  constructor(maxSize = 1_000) {
    this.maxSize = maxSize;
  }

  add(id: string, payload: T, reason: string, attempts: number): void {
    if (this.items.length >= this.maxSize) this.items.shift();
    this.items.push({ id, payload, reason, attempts, failedAt: new Date().toISOString() });
  }

  getAll(): DeadLetterItem<T>[] {
    return [...this.items];
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}
