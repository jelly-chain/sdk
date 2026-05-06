/** Date and time utilities for sports SDK. */

export function parseKickoff(kickoffUtc: string): Date {
  return new Date(kickoffUtc);
}

export function restDaysBetween(lastMatchUtc: string, nextMatchUtc: string): number {
  const last = new Date(lastMatchUtc).getTime();
  const next = new Date(nextMatchUtc).getTime();
  return Math.floor((next - last) / (1000 * 60 * 60 * 24));
}

export function isMatchLive(kickoffUtc: string, durationMinutes = 120): boolean {
  const kickoff = new Date(kickoffUtc).getTime();
  const now = Date.now();
  return now >= kickoff && now <= kickoff + durationMinutes * 60 * 1000;
}

export function isMatchToday(kickoffUtc: string): boolean {
  const kickoff = new Date(kickoffUtc);
  const today = new Date();
  return (
    kickoff.getUTCFullYear() === today.getUTCFullYear() &&
    kickoff.getUTCMonth() === today.getUTCMonth() &&
    kickoff.getUTCDate() === today.getUTCDate()
  );
}

export function formatMatchDate(kickoffUtc: string): string {
  return new Date(kickoffUtc).toISOString().slice(0, 10);
}

export function isoNow(): string {
  return new Date().toISOString();
}
