export class SessionWindow<T> {
  private inactivityMs: number;
  private sessions: { items: T[]; lastActivity: number }[] = [];

  constructor(inactivityMs: number) {
    this.inactivityMs = inactivityMs;
  }

  add(value: T): void {
    const now = Date.now();
    const last = this.sessions.at(-1);
    if (last && now - last.lastActivity < this.inactivityMs) {
      last.items.push(value);
      last.lastActivity = now;
    } else {
      this.sessions.push({ items: [value], lastActivity: now });
    }
  }

  getActiveSessions(): T[][] {
    const cutoff = Date.now() - this.inactivityMs;
    return this.sessions.filter((s) => s.lastActivity >= cutoff).map((s) => s.items);
  }

  closeExpiredSessions(): T[][] {
    const cutoff = Date.now() - this.inactivityMs;
    const expired = this.sessions.filter((s) => s.lastActivity < cutoff);
    this.sessions = this.sessions.filter((s) => s.lastActivity >= cutoff);
    return expired.map((s) => s.items);
  }

  sessionCount(): number {
    return this.sessions.length;
  }
}
