import { contractService } from "./contractService";

export const contractController = {

    // Opprett kontrakt
    async create(ctx: any) {
        const body = await ctx.request.json();
        const result = await contractService.create(body);

        return new Response(JSON.stringify(result), {
            status: result.success ? 201 : 400,
            headers: { "Content-Type": "application/json" }
        });
    },

    // Hent liste med kontrakter
    async list(ctx: any) {
        try {
            const params = new URL(ctx.request.url).searchParams;
            const query = params.get("query") ?? "";

            const result = await contractService.list(query);

            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

        } catch (err) {
            return new Response(JSON.stringify({
                success: false,
                error: "Feil ved henting av kontrakter."
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    },

    // Hent én kontrakt på ID
    async get(ctx: any) {
        const id = Number(ctx.params.id);

        if (isNaN(id)) {
            return new Response(JSON.stringify({
                success: false,
                error: "Ugyldig kontrakt-ID."
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const result = await contractService.get(id);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 404,
            headers: { "Content-Type": "application/json" }
        });
    },

    // Oppdater kontrakt
    async update(ctx: any) {
        const id = Number(ctx.params.id);
        const body = await ctx.request.json();

        const result = await contractService.update(id, body);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
        });
    },

    // Slett kontrakt
    async delete(ctx: any) {
        const id = Number(ctx.params.id);

        const result = await contractService.delete(id);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "application/json" }
        });
    },

    // Søk etter kontrakter
    async search(ctx: any) {
        const params = new URL(ctx.request.url).searchParams;
        const query = params.get("query") ?? "";

        const result = await contractService.search(query);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
};