// kode inspirert fra https://github.com/mariuswallin/hiof-2025-webapp-demo/blob/main/src/features/tasks/tasksController.ts
// Ligger klart for når databasen er satt opp

import { clientService } from "./clientService";



export const clientController = {
    async create(ctx: any) {
        const body = await ctx.request.json();
        const result = await clientService.create(body);

        return new Response(JSON.stringify(result), {
            status: result.success ? 201 : 400,
            headers: { "Content-Type": "application/json" }
        })
    },

    async list(ctx: any) {
        try {
            const params = new URL(ctx.request.url).searchParams;
            const query = params.get("query") ?? "";

            const result = await clientService.list(query);

            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

        } catch (err) {
            return new Response(JSON.stringify({
                success: false,
                error: "Feil ved henting av klienter."
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    },

    async get(ctx: any) {
        const id = Number(ctx.params.id);

        if (isNaN(id)) {
            return new Response(JSON.stringify({
                success: false,
                error: "Ugyldig klient-ID."
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const result = await clientService.get(id);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 404,
            headers: { "Content-Type": "application/json" }
        });
    },

    async update(ctx: any) {
        const id = Number(ctx.params.id);
        const body = await ctx.request.json();

        const result = await clientService.update(id, body);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
        });
    },

    async delete(ctx: any) {
        const id = Number(ctx.params.id);
        const result = await clientService.delete(id);
        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
        })
    },

    async search(ctx: any) {
        const params = new URL(ctx.request.url).searchParams;
        const query = params.get("query") ?? "";
        const result = await clientService.search(query);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
};