// hooks.server.ts
import type { Handle, HandleFetch, RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
//var Negotiator = require('negotiator')
import Neg from 'negotiator';
import { initialLocale } from '$lib/i18n'; // Import to initialize. Important :)
import { langs } from '$lib/i18n/langs';
//import { createActor as createDelta } from "./declarations/delta/index";
let langKeys = Object.keys(langs);


export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname == '/google412d55fb8d43b8ef.html') {
        return new Response('google-site-verification: google412d55fb8d43b8ef.html', {
            headers: { 'Content-Type': 'text/plain' }
        });
    }
    if (event.url.pathname.startsWith("/api")) {
        return resolve(event);
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