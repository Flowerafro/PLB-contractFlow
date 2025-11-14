import { hovedListenService } from "@/features/databaseDataRetrieval/services/hovedListenService";
import useDatabase from "@/features/databaseDataRetrieval/hooks/useDatabase";
import { HovedListeItem } from "@/app/types/hovedlisten";

export function hovedlistenDatabaseData() {
    return useDatabase<HovedListeItem>(
        hovedListenService.getHovedListenData,
        []
    );
}