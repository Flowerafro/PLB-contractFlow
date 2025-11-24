import { route } from "rwsdk/router";
import type { RequestInfo } from "rwsdk/worker";
import { hovedListenRepository } from "@/features/dataRetrieval/repositoryPatterns/createHovedListenRepository";
import hovedListenService from "@/features/dataRetrieval/services/useHovedListenService";

export const hovedListenRoutes = [
  route("/d1-retrieval", async ({ request, ctx }: RequestInfo) => {
    if (request.method === "GET") {
      try {
        const result = await hovedListenRepository.findMany(ctx.env);
        if (result.success) {
          return Response.json({ success: true, data: result.data }, 
          { status: 200 });
        }
        else {
          return Response.json(
            {success: false, error: result.error || "An error occurred" },
            { status: 500 }
          );
        }
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