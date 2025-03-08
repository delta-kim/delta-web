import type { PageLoad } from './$types';
import * as cheerio from 'cheerio';

interface item {
    // element: string;
    text: string;
    tagName: string;
}



export const load: PageLoad = async ({ params, fetch }) => {
    //let html = await import(`./${params.lang}.html?raw`);
    let res = await fetch(`/faq/${params.lang}.htm`);
    let html = await res.text();
    const $ = cheerio.load(html, null, false);
    //const itms = $("h1,h2,h3,h4");
    let items: item[][] = [];
    let group: item[] = [];
    $('h2,div').each(function (index, element: cheerio.Element) {
        const elem = $(element);
        console.log(element.tagName, elem.html());
        const text = elem.html() || "";
        if (element.tagName == 'h2' && group.length > 0) {
            items.push(Array.from(group));
            group.length = 0;
        }
        group.push(
            {
                text,
                tagName: element.tagName
            }
        )
    });
    if (group.length > 0) {
        items.push(Array.from(group));
    }

    return { content: html, items };
};