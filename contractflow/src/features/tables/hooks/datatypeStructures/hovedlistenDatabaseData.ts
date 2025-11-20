import { hovedListenService } from "@/features/dataRetrieval/services/hovedListenService";
import useDatabase from "@/features/dataRetrieval/hooks/useDatabase";
import { HovedListeItem } from "@/app/types/hovedlisten";

export function hovedlistenDatabaseData() {
    return useDatabase<HovedListeItem>(
        hovedListenService.getHovedListenData,
        []
    );
}