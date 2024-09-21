import { sveltekit } from '@sveltejs/kit/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import inject from '@rollup/plugin-inject';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	server: {
		host: '0.0.0.0',
	},
	build: {
		target: 'es2020',
		rollupOptions: {
			// Polyfill Buffer for production build
			// plugins: [
			// 	inject({
			// 		modules: { Buffer: ['buffer', 'Buffer'] }
			// 	})
			// ]
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			}
		}
	}
});
