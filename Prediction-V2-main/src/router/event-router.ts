import type { EventPayload } from '../types.js';

export type EventHandler = (event: EventPayload) => Promise<void>;

export class EventRouter {
  private routes: Map<string, EventHandler[]> = new Map();

  on(eventType: string, handler: EventHandler): void {
    if (!this.routes.has(eventType)) this.routes.set(eventType, []);
    this.routes.get(eventType)!.push(handler);
  }

  async route(event: EventPayload): Promise<void> {
    const handlers = [
      ...(this.routes.get(event.type) ?? []),
      ...(this.routes.get('*') ?? []),
    ];
    await Promise.all(handlers.map((h) => h(event)));
  }

  off(eventType: string, handler: EventHandler): void {
    const existing = this.routes.get(eventType);
    if (existing) this.routes.set(eventType, existing.filter((h) => h !== handler));
  }
}
