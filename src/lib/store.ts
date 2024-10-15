import {writable , readable, type Writable , type Readable} from 'svelte/store';
//import type { Identity } from '@dfinity/agent';
export const lang : Writable<string> = writable("en");
export const principal: Writable<string> = writable("");
export const delta : Writable<any | null> = writable(null);
export const ic_host : Readable<string> = readable("https://ic0.app"); //   'http://192.168.43.10:8000';