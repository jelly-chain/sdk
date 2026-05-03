import type { EventPayload } from '../types.js';

export class StreamRebuilder {
  sort(events: EventPayload[]): EventPayload[] {
    return [...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  deduplicate(events: EventPayload[]): EventPayload[] {
    const seen = new Set<string>();
    return events.filter((e) => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });
  }

  filterByType(events: EventPayload[], types: string[]): EventPayload[] {
    const typeSet = new Set(types);
    return events.filter((e) => typeSet.has(e.type));
  }

  filterByChain(events: EventPayload[], chains: string[]): EventPayload[] {
    const chainSet = new Set(chains);
    return events.filter((e) => chainSet.has(e.chain));
  }

  rebuild(events: EventPayload[], options: { sort?: boolean; deduplicate?: boolean } = {}): EventPayload[] {
    let result = events;
    if (options.deduplicate) result = this.deduplicate(result);
    if (options.sort !== false) result = this.sort(result);
    return result;
  }
}
