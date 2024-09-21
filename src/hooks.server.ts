// hooks.server.ts
import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

// export const handle: Handle = async ({ event, resolve }) => {
//     const lang = event.request.headers.get('accept-language')?.split(',')[0];
//     console.log("hooks.server", lang);
//     if (lang) {
//         locale.set("en")
//     }
//     return resolve(event)
// }