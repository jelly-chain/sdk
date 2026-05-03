export class TumblingWindow<T> {
  private windowMs: number;
  private buffer: { value: T; timestamp: number }[] = [];
  private windowStart: number;

  constructor(windowMs: number) {
    this.windowMs = windowMs;
    this.windowStart = Date.now();
  }

  add(value: T): void {
    const now = Date.now();
    if (now - this.windowStart >= this.windowMs) {
      this.buffer = [];
      this.windowStart = now;
    }
    this.buffer.push({ value, timestamp: now });
  }

  getWindow(): T[] {
    return this.buffer.map((e) => e.value);
  }

  flush(): T[] {
    const values = this.getWindow();
    this.buffer = [];
    this.windowStart = Date.now();
    return values;
  }

  size(): number {
    return this.buffer.length;
  }
}
