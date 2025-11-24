import { HovedListeItem } from '@/app/types/hovedlisten';

export interface HovedListenService {
  getHovedListenData(): Promise<HovedListeItem[]>;
}
