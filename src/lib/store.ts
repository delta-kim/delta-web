import {writable , type Writable } from 'svelte/store';
export const lang : Writable<string> = writable("en");