import hovedListenService from "@/server/databaseViews/services/useHovedListenService";
import useDatabase from "@/server/databaseViews/hooks/useDatabase";
import { HovedListeItem } from "@/types/hovedlisten";

export function hovedlistenDatabaseData() {
    return useDatabase<HovedListeItem>(
        hovedListenService().getHovedListenData,
        []
    );
}