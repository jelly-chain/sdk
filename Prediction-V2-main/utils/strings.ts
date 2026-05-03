export function normalizeKeyword(keyword: string): string {
  return keyword.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

export function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function containsAny(text: string, keywords: string[]): boolean {
  const normalized = text.toLowerCase();
  return keywords.some((kw) => normalized.includes(kw.toLowerCase()));
}

export function redactSecret(value: string, visibleChars = 4): string {
  if (value.length <= visibleChars) return '*'.repeat(value.length);
  return `${value.slice(0, visibleChars)}${'*'.repeat(value.length - visibleChars)}`;
}
