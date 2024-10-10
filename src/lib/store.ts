import {writable , type Writable } from 'svelte/store';
//import type { Identity } from '@dfinity/agent';
export const lang : Writable<string> = writable("en");
export const principal: Writable<string> = writable("");
export const delta : Writable<any | null> = writable(null);