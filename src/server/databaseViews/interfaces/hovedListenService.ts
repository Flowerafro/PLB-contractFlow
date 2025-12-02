import { HovedListeItem } from '@/types/hovedlisten';

export interface HovedListenService {
  getHovedListenData(): Promise<HovedListeItem[]>;
}