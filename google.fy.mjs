import { v2 } from '@google-cloud/translate';
const { Translate } = v2;

console.log("google translate");
const translate = new Translate({key: "AIzaSyD7SiHGzeCZisk0HjbauvQfTRrtd-WpWt0"});

const text = 'Hello, world!';

// The target language
const target = 'ru';

// Translates some text into Russian
const [translation] = await translate.translate(text, target);
console.log(`Text: ${text}`);
console.log(`Translation: ${translation}`);



