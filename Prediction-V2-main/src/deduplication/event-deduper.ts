import type { EventPayload } from '../types.js';

export class EventDeduper {
  private seen: Set<string> = new Set();
  private maxSize: number;

  constructor(maxSize = 50_000) {
    this.maxSize = maxSize;
  }

  isDuplicate(event: EventPayload): boolean {
    return this.seen.has(event.id);
  }

  mark(event: EventPayload): void {
    if (this.seen.size >= this.maxSize) {
      const first = this.seen.values().next().value;
      if (first !== undefined) this.seen.delete(first);
    }
    this.seen.add(event.id);
  }

  filter(events: EventPayload[]): EventPayload[] {
    return events.filter((e) => {
      if (this.isDuplicate(e)) return false;
      this.mark(e);
      return true;
    });
  }

  reset(): void {
    this.seen.clear();
  }

  size(): number {
    return this.seen.size;
  }
}
