import { HovedListeItem } from '@/types/hovedlisten';
import { AppContext } from '@/worker';
import { HovedListenService } from '../interfaces/hovedListenService';

export default function useHovedListenService(): HovedListenService {
  return {
    async getHovedListenData(): Promise<HovedListeItem[]> {
      try {
        if (typeof window !== 'undefined') {
          try {
            const response = await fetch('/hovedlisten');
            if (response.ok) {
              const result: { success: boolean; data: HovedListeItem[] } = await response.json();
              return result.success ? result.data : [];
            }
          } catch (apiError) {
            console.log('API call failed, falling back to sample data:', apiError);
            return [];
//            return getSampleData();
          }
        }

        console.log('Using empty data for development');
        return [];
      } catch (error) {
        console.error('Service error, falling back to sample data:', error);
        return [];
      }
    }
  };
}