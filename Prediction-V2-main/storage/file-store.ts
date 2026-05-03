import type { StorageAdapter } from './storage-adapter.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

export class FileStore implements StorageAdapter {
  private dir: string;

  constructor(dir = '.sdk-storage') {
    this.dir = dir;
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  private filePath(key: string): string {
    return join(this.dir, `${encodeURIComponent(key)}.json`);
  }

  async get<T>(key: string): Promise<T | null> {
    const path = this.filePath(key);
    if (!existsSync(path)) return null;
    try {
      const raw = readFileSync(path, 'utf-8');
      const entry = JSON.parse(raw) as { value: T; expiresAt?: number };
      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        unlinkSync(path);
        return null;
      }
      return entry.value;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    const entry = { value, expiresAt: ttlMs ? Date.now() + ttlMs : undefined };
    writeFileSync(this.filePath(key), JSON.stringify(entry));
  }

  async delete(key: string): Promise<void> {
    const path = this.filePath(key);
    if (existsSync(path)) unlinkSync(path);
  }

  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }

  async clear(): Promise<void> {
    const { readdirSync } = await import('fs');
    for (const f of readdirSync(this.dir)) {
      unlinkSync(join(this.dir, f));
    }
  }

  async keys(prefix?: string): Promise<string[]> {
    const { readdirSync } = await import('fs');
    const files = readdirSync(this.dir).map((f) => decodeURIComponent(f.replace('.json', '')));
    return prefix ? files.filter((k) => k.startsWith(prefix)) : files;
  }
}
