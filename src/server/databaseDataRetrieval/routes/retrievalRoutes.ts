import { route } from "rwsdk/router";
import { RetrievalController } from "../interfaces/retrievalController";

export function retrievalRoutes<TSelect, TInsert>(
    controller: RetrievalController<TSelect, TInsert>,
    retrievalPath: string = ""
) {
    return [
        route(`${retrievalPath}/`, async (ctx) => {
            const method = ctx.request.method.toLowerCase();
            switch (method) {
                case "get":
                    return controller.list(ctx);
                case "post":
                    return controller.create(ctx);
                default:
                    return new Response("Method Not Allowed", { status: 405 });
            }
        }),
        route(`${retrievalPath}/search`, (ctx) => {
            return controller.search(ctx);
        }),
        route(`${retrievalPath}/:id`, async (ctx) => {
            const method = ctx.request.method.toLowerCase();
            switch (method) {
                case "get":
                    return controller.get(ctx);
                case "put":
                    return controller.update(ctx);
                case "delete":
                    return controller.delete(ctx);
                default:
                    return new Response("Method Not Allowed", { status: 405 });
            }
        })
    ];
}