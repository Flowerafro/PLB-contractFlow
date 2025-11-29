import hovedListenService from "@/features/databaseViews/services/useHovedListenService";
import useDatabase from "@/features/databaseViews/hooks/useDatabase";
import { HovedListeItem } from "@/app/types/hovedlisten";

export function hovedlistenDatabaseData() {
    return useDatabase<HovedListeItem>(
        hovedListenService().getHovedListenData,
        []
    );
}