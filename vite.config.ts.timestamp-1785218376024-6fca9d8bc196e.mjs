// vite.config.ts
import { sveltekit } from "file:///Users/user/Documents/workspace/project/delta-web/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { purgeCss } from "file:///Users/user/Documents/workspace/project/delta-web/node_modules/vite-plugin-tailwind-purgecss/dist/index.js";
import "file:///Users/user/Documents/workspace/project/delta-web/node_modules/@rollup/plugin-inject/dist/es/index.js";
import { defineConfig } from "file:///Users/user/Documents/workspace/project/delta-web/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [sveltekit(), purgeCss()],
  server: {
    host: "0.0.0.0"
  },
  // build: {
  // 	target: 'es2020',
  // 	rollupOptions: {
  // 		// Polyfill Buffer for production build
  // 		plugins: [
  // 			inject({
  // 				modules: { Buffer: ['buffer', 'Buffer'] }
  // 			})
  // 		]
  // 	}
  // },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdXNlci9Eb2N1bWVudHMvd29ya3NwYWNlL3Byb2plY3QvZGVsdGEtd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdXNlci9Eb2N1bWVudHMvd29ya3NwYWNlL3Byb2plY3QvZGVsdGEtd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy91c2VyL0RvY3VtZW50cy93b3Jrc3BhY2UvcHJvamVjdC9kZWx0YS13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgcHVyZ2VDc3MgfSBmcm9tICd2aXRlLXBsdWdpbi10YWlsd2luZC1wdXJnZWNzcyc7XG5pbXBvcnQgaW5qZWN0IGZyb20gJ0Byb2xsdXAvcGx1Z2luLWluamVjdCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW3N2ZWx0ZWtpdCgpLCBwdXJnZUNzcygpXSxcblx0c2VydmVyOiB7XG5cdFx0aG9zdDogJzAuMC4wLjAnLFxuXHR9LFxuXHQvLyBidWlsZDoge1xuXHQvLyBcdHRhcmdldDogJ2VzMjAyMCcsXG5cdC8vIFx0cm9sbHVwT3B0aW9uczoge1xuXHQvLyBcdFx0Ly8gUG9seWZpbGwgQnVmZmVyIGZvciBwcm9kdWN0aW9uIGJ1aWxkXG5cdC8vIFx0XHRwbHVnaW5zOiBbXG5cdC8vIFx0XHRcdGluamVjdCh7XG5cdC8vIFx0XHRcdFx0bW9kdWxlczogeyBCdWZmZXI6IFsnYnVmZmVyJywgJ0J1ZmZlciddIH1cblx0Ly8gXHRcdFx0fSlcblx0Ly8gXHRcdF1cblx0Ly8gXHR9XG5cdC8vIH0sXG5cdG9wdGltaXplRGVwczoge1xuXHRcdGVzYnVpbGRPcHRpb25zOiB7XG5cdFx0XHQvLyBOb2RlLmpzIGdsb2JhbCB0byBicm93c2VyIGdsb2JhbFRoaXNcblx0XHRcdGRlZmluZToge1xuXHRcdFx0XHRnbG9iYWw6ICdnbG9iYWxUaGlzJ1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsaUJBQWlCO0FBQy9WLFNBQVMsZ0JBQWdCO0FBQ3pCLE9BQW1CO0FBQ25CLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQUEsRUFDakMsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1A7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFZQSxjQUFjO0FBQUEsSUFDYixnQkFBZ0I7QUFBQTtBQUFBLE1BRWYsUUFBUTtBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
