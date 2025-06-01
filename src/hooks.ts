import type { Handle, HandleFetch, RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
//var Negotiator = require('negotiator')
import Neg from 'negotiator';
import { initialLocale } from '$lib/i18n'; // Import to initialize. Important :)
import { langs } from '$lib/i18n/langs';
let langKeys = Object.keys(langs);

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname == '/google412d55fb8d43b8ef.html') {
        return new Response('google-site-verification: google412d55fb8d43b8ef.html', {
            headers: { 'Content-Type': 'text/plain' }
        });
    }
    // if (event.url.pathname.startsWith("/canister_status/")) {
    //     const kv = event.platform?.env?.KV;
    //     if (!kv) throw new Error('KV not bound!');

    //     // 1. 尝试从 KV 读取
    //     let cachedData = await kv.get('data-1727092904161', 'json');

    //     return new Response(JSON.stringify(cachedData));


    //     // // 2. 无缓存时生成数据
    //     // const newData = { timestamp: Date.now(), value: 'Data from KV!' };
    //     // await kv.put('cached-data', JSON.stringify(newData), {
    //     //     expirationTtl: 3600, // 1 小时后过期
    //     // });

    //     //return new Response(JSON.stringify(newData));
    // }
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
};