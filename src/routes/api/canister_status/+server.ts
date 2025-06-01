// src/routes/api/user/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { ic_host, delta } from "../../../lib/store";
import { createActor as createDelta } from "../../../declarations/delta/index";
export const GET: RequestHandler = async (event) => {
    let canisterId = event.url.searchParams.get("id");
    try {
        const kv = event.platform?.env?.KV;
        const key = `CanisterStatus:${canisterId}`;
        let json = await kv.get(key, 'json');
        const now = Math.round(Date.now() / 1000);
        if (json == null || json.update + 5 < now) {
            if (json != null) { // 标记时间，防止重复get
                json.update = now;
                kv.put(key, JSON.stringify(json));
            }
            if (get(delta) == null) {
                const deltaAgent = await createDelta("ojpsk-siaaa-aaaam-adtea-cai", { agentOptions: { host: get(ic_host) } });
                delta.set(deltaAgent);
            }
            let status = await get(delta).getCanisterStatus(canisterId);
            for (const i in status) {
                status[i][1] = Number(status[i][1]);
            }
            json = { status, update: now };
            let json_str = JSON.stringify(json);
            await kv.put(key, json_str);
            return new Response(JSON.stringify(json.status), {
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