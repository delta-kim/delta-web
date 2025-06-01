// hooks.server.ts
import type { Handle, HandleFetch, RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
//var Negotiator = require('negotiator')
import Neg from 'negotiator';
import { initialLocale } from '$lib/i18n'; // Import to initialize. Important :)
import { langs } from '$lib/i18n/langs';
import { createActor as createDelta } from "./declarations/delta/index";
let langKeys = Object.keys(langs);


export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname == '/google412d55fb8d43b8ef.html') {
        return new Response('google-site-verification: google412d55fb8d43b8ef.html', {
            headers: { 'Content-Type': 'text/plain' }
        });
    }
    if (event.url.pathname.startsWith("/canister_status/")) {
        const deltaAgent = createDelta("ojpsk-siaaa-aaaam-adtea-cai", { agentOptions: { host: "https://ic0.app" } });
        function replacer(key, value) {
            if (typeof value === 'bigint') return Number(value);
            return value;
        }
        const actor_delta = await deltaAgent;
        let canisterId = event.url.pathname.split("/")[2];
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
                let status = await actor_delta.getCanisterStatus(canisterId);
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
    }
    if (event.url.pathname == "/") {
        const negotiator = new Neg({
            headers: {
                "accept-language": event.request.headers.get('accept-language') || "en"
            }
        });
        let language = negotiator.language(langKeys) || 'en';
        throw redirect(302, `/${language}/home`);
    }
    let urlSegmen = event.url.pathname.split("/");
    let lang = urlSegmen[1]
    //console.log("event.url.pathname.split(/)", event.url.pathname.split("/"));
    if (!langKeys.includes(lang)) {
        const negotiator = new Neg({
            headers: {
                "accept-language": event.request.headers.get('accept-language') || "en"
            }
        });
        let language = negotiator.language(langKeys) || 'en';
        if (urlSegmen[2] == undefined) {
            throw redirect(302, `/${language}/home`);
        }
        throw redirect(302, `/${language}/${urlSegmen.slice(2).join("/")}`);
    }
    if (urlSegmen[2] == undefined) {
        throw redirect(302, `/${lang}/home`);
    }
    await initialLocale(lang);
    return resolve(event);
}