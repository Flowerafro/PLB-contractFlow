import { route } from "rwsdk/router";
import type { RequestInfo } from "rwsdk/worker";
import { hovedListenService } from "@/features/dataRetrieval/services/hovedListenService";

export const hovedListenRoutes = [
  route("/", async ({ request }: RequestInfo) => {
    if (request.method === "GET") {
      try {
        const data = await hovedListenService.getHovedListenData();
        return Response.json({ success: true, data });
      } catch (error) {
        console.error("Error fetching hovedlisten data:", error);
        return Response.json(
          { 
            success: false, 
            error: "Failed to fetch hovedlisten data" 
          }, 
          { status: 500 }
        );
      }
    }
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }),
];