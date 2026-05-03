export class SlidingWindow<T> {
  private windowMs: number;
  private buffer: { value: T; timestamp: number }[] = [];

  constructor(windowMs: number) {
    this.windowMs = windowMs;
  }

  add(value: T): void {
    this.evict();
    this.buffer.push({ value, timestamp: Date.now() });
  }

  getWindow(): T[] {
    this.evict();
    return this.buffer.map((e) => e.value);
  }

  private evict(): void {
    const cutoff = Date.now() - this.windowMs;
    this.buffer = this.buffer.filter((e) => e.timestamp >= cutoff);
  }

  size(): number {
    this.evict();
    return this.buffer.length;
  }
}
