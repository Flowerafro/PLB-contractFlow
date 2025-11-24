import { HovedListeItem } from '@/app/types/hovedlisten';
import type { D1Database } from '@cloudflare/workers-types';
import type { Result } from '@/app/types/results';

export interface HovedListenRepository {
  findMany(env: { DB: D1Database }): Promise<Result<HovedListeItem[]>>;
}