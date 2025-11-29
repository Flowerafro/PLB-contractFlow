// kode inspirert av https://github.com/mariuswallin/hiof-2025-webapp-demo/blob/main/src/features/tasks/tasksRoutes.ts
// Ligger klart for når databasen er satt opp
import { route } from "rwsdk/router";
import { clientController } from "./clientController";

export const clientRoutes = [

    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return clientController.list(ctx);
            case "post":
                return clientController.create(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    route("/search", (ctx) => {
        return clientController.search(ctx);
    }),

    route("/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return clientController.get(ctx);
            case "put":
                return clientController.update(ctx);
            case "delete":
                return clientController.delete(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    })
]