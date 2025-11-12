import { hovedListenDbService } from "@/features/databaseDataRetrieval/services/hovedListenDbService";
import useDatabase from "@/features/databaseDataRetrieval/hooks/useDatabase";
import { HovedListeItem } from "@/app/types/hovedlisten";

export function hovedlistenDatabaseData() {
    return useDatabase <HovedListeItem>(
        () => hovedListenDbService.getHovedListenData(),
        []
    );
}