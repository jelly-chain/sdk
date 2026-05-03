import type { EventPayload } from '../types.js';

export class EventQueue {
  private buffer: EventPayload[] = [];
  private maxSize: number;

  constructor(maxSize = 10_000) {
    this.maxSize = maxSize;
  }

  push(event: EventPayload): void {
    if (this.buffer.length >= this.maxSize) this.buffer.shift();
    this.buffer.push(event);
  }

  pop(): EventPayload | undefined {
    return this.buffer.shift();
  }

  flush(): EventPayload[] {
    const events = [...this.buffer];
    this.buffer = [];
    return events;
  }

  size(): number {
    return this.buffer.length;
  }

  isEmpty(): boolean {
    return this.buffer.length === 0;
  }
}
