export function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function fingerprintObject(obj: unknown): string {
  const serialized = JSON.stringify(obj, Object.keys(obj as object).sort());
  return simpleHash(serialized);
}

export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function deterministicId(parts: string[]): string {
  return simpleHash(parts.join(':'));
}
