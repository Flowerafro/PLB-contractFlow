import { route } from "rwsdk/router";
import type { RequestInfo } from "rwsdk/worker";
import { hovedListenService } from "@/features/databaseDataRetrieval/services/hovedListenService";

export const hovedListenRoutes = [
  route("/", async ({ request, ctx }: RequestInfo) => {
    if (request.method === "GET") {
      try {
        const data = await hovedListenService.getHovedListenData(ctx && ctx.env);
        return Response.json({ success: true, data });
