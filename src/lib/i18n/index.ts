import { register, init, getLocaleFromPathname, addMessages, locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment'
import { page, navigating } from '$app/stores';

// register('en', () => import('./en.json'));

import en from './en.json';
//import zhCHS from './zh-CHS.json';

addMessages('en', en);
//addMessages('zh-CN', zhCHS);
register('en', () => import('./en.json'));
register('zh-CN', () => import('./zh-CHS.json'));
register('es', () => import('./es.json'));
register('fr', () => import('./fr.json'));
register('ar', () => import('./ar.json'));
register('ru', () => import('./ru.json'));
register('pt', () => import('./pt.json'));
register('hi', () => import('./hi.json'));
register('it', () => import('./it.json'));
register('de', () => import('./de.json'));
register('ja', () => import('./ja.json'));
register('zh-TW', () => import('./zh-TW.json'));
register('ko', () => import('./ko.json'));
register('bn', () => import('./bn.json'));
register('th', () => import('./th.json'));
register('nl', () => import('./nl.json'));
register('vi', () => import('./vi.json'));
register('pl', () => import('./pl.json'));
register('uk', () => import('./uk.json'));
register('el', () => import('./el.json'));


init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromPathname(/^\/(.*?)\//) || "en",
});


if (browser) {
    navigating.subscribe(async (nav) => {
        if (nav) {
            if (nav.from?.params?.lang != nav.to?.params?.lang) {
                console.log("navigating to", nav.to?.params?.lang);
                locale.set(nav.to?.params?.lang);
                await waitLocale();
            }
        }

    });
}

export async function initialLocale(initialLocale: string) {
    await locale.set(initialLocale);
    //await waitLocale();
}

// getLocaleFromPathname(/^\/(.*?)\//) || 'en',