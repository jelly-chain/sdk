import { Venue } from '../types.js';
import { MemoryCache } from '../cache/memory-cache.js';
import { NotFoundError } from '../errors.js';

export class VenuesModule {
  constructor(private readonly cache: MemoryCache) {}

  async list(): Promise<Venue[]> {
    return this.cache.get<Venue[]>('venues:all') ?? [];
  }

  async byId(id: string): Promise<Venue> {
    const cached = this.cache.get<Venue>(`venue:${id}`);
    if (cached) return cached;
    throw new NotFoundError('Venue', id);
  }

  async byCity(city: string): Promise<Venue[]> {
    const all = await this.list();
    return all.filter((v) => v.city.toLowerCase() === city.toLowerCase());
  }

  async byCountry(country: string): Promise<Venue[]> {
    const all = await this.list();
    return all.filter((v) => v.country.toLowerCase() === country.toLowerCase());
  }
}
