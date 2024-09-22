import type { PageLoad } from './$types';
import * as cheerio from 'cheerio';

interface Cata {
    // element: string;
    id: string;
    text: string;
    addClass: string[];
}



export const load: PageLoad = async ({ params, fetch }) => {
    //let html = await import(`./${params.lang}.html?raw`);
    let res = await fetch(`/whitepaper/${params.lang}.htm`);
    let html = await res.text();
    const $ = cheerio.load(html, null, false);
    //const itms = $("h1,h2,h3,h4");
    // 假设你想遍历所有的<p>元素
    let catas: Cata[] = [];
    $('h1,h2,h3,h4').each(function (index, element: cheerio.Element) {

        const elem = $(element);
        const text = elem.text();
        let id = elem.attr('id');
        if (id == undefined) {
            id = text.toLocaleLowerCase().trim().replaceAll(' ', '_');
            elem.attr('id', id);
        }
        let addClass: string[] = [];
        if (element.tagName == 'h1') {
            elem.addClass('h1 my-8')
        } else if (element.tagName == 'h2') {
            elem.addClass('h2 mb-4 mt-8')
        } else if (element.tagName == 'h3') {
            elem.addClass('h3 mb-3 mt-6')
            addClass.push('ml-4');
        } else if (element.tagName == 'h4') {
            elem.addClass('h3 mb-2 mt-4')
            addClass.push('ml-8');
        }
        let cata: Cata = {
            id,
            text,
            addClass
        }
        catas.push(cata);
    });

    return { content: $.html(), catas };
};