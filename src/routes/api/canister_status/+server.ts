// src/routes/api/user/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async (event) => {
    let canisterId = event.url.searchParams.get("id");
    if (canisterId == null) {
        return new Response("Parameter exception");
    }
    try {
        const kv = event.platform?.env?.KV;
        const key = `CanisterStatus:${canisterId}`;
        let json = await kv.get(key, 'json');
        if (json == null) {
            return new Response(JSON.stringify([["memory_size", 1000]]), {
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(json.status), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(error.message);
    }
};