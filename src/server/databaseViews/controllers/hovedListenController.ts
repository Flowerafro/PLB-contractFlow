
import { HovedListenRepository } from '../interfaces/hovedListenRepository';

export function createHovedListenController(repository: HovedListenRepository, env: { DB: any }) {
    return {
        async list(ctx: any) {
            try {
                const result = await repository.findMany(env);
                return new Response(JSON.stringify(result), {
                    status: result.success ? 200 : 500,
                    headers: { "Content-Type": "application/json" }
                });
            } catch (err) {
                return new Response(JSON.stringify({
                    success: false,
                    error: { code: 500, message: "Failed to fetch hovedlisten data." }
                }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }
        },
    };
}