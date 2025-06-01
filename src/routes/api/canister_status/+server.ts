// src/routes/api/user/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
    const kv = event.platform?.env?.KV;
    const data = { name: "Alice", id: 123, "pathname" : event.url.pathname, "kv" : typeof kv};

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
};