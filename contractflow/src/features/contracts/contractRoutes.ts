import { route } from "rwsdk/router";
import { contractController } from "./contractController";

export const contractRoutes = [

    // /api/v1/contracts
    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();

        switch (method) {
            case "get":
                return contractController.list(ctx);
            case "post":
                return contractController.create(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),

    // /api/v1/contracts/search
    route("/search", (ctx) => {
        return contractController.search(ctx);
    }),

    // /api/v1/contracts/:id
    route("/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase();

        switch (method) {
            case "get":
                return contractController.get(ctx);
            case "put":
                return contractController.update(ctx);
            case "delete":
                return contractController.delete(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    })
];