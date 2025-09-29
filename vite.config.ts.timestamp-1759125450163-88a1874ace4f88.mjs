// vite.config.ts
import { sveltekit } from "file:///d:/pj/delta-kim/delta-web/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { purgeCss } from "file:///d:/pj/delta-kim/delta-web/node_modules/vite-plugin-tailwind-purgecss/dist/index.js";
import "file:///d:/pj/delta-kim/delta-web/node_modules/@rollup/plugin-inject/dist/es/index.js";
import { defineConfig } from "file:///d:/pj/delta-kim/delta-web/node_modules/vite/dist/node/index.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJkOlxcXFxwalxcXFxkZWx0YS1raW1cXFxcZGVsdGEtd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJkOlxcXFxwalxcXFxkZWx0YS1raW1cXFxcZGVsdGEtd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9kOi9wai9kZWx0YS1raW0vZGVsdGEtd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCB7IHB1cmdlQ3NzIH0gZnJvbSAndml0ZS1wbHVnaW4tdGFpbHdpbmQtcHVyZ2Vjc3MnO1xuaW1wb3J0IGluamVjdCBmcm9tICdAcm9sbHVwL3BsdWdpbi1pbmplY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKSwgcHVyZ2VDc3MoKV0sXG5cdHNlcnZlcjoge1xuXHRcdGhvc3Q6ICcwLjAuMC4wJyxcblx0fSxcblx0Ly8gYnVpbGQ6IHtcblx0Ly8gXHR0YXJnZXQ6ICdlczIwMjAnLFxuXHQvLyBcdHJvbGx1cE9wdGlvbnM6IHtcblx0Ly8gXHRcdC8vIFBvbHlmaWxsIEJ1ZmZlciBmb3IgcHJvZHVjdGlvbiBidWlsZFxuXHQvLyBcdFx0cGx1Z2luczogW1xuXHQvLyBcdFx0XHRpbmplY3Qoe1xuXHQvLyBcdFx0XHRcdG1vZHVsZXM6IHsgQnVmZmVyOiBbJ2J1ZmZlcicsICdCdWZmZXInXSB9XG5cdC8vIFx0XHRcdH0pXG5cdC8vIFx0XHRdXG5cdC8vIFx0fVxuXHQvLyB9LFxuXHRvcHRpbWl6ZURlcHM6IHtcblx0XHRlc2J1aWxkT3B0aW9uczoge1xuXHRcdFx0Ly8gTm9kZS5qcyBnbG9iYWwgdG8gYnJvd3NlciBnbG9iYWxUaGlzXG5cdFx0XHRkZWZpbmU6IHtcblx0XHRcdFx0Z2xvYmFsOiAnZ2xvYmFsVGhpcydcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLGlCQUFpQjtBQUMvUixTQUFTLGdCQUFnQjtBQUN6QixPQUFtQjtBQUNuQixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUFBLEVBQ2pDLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBWUEsY0FBYztBQUFBLElBQ2IsZ0JBQWdCO0FBQUE7QUFBQSxNQUVmLFFBQVE7QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNUO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
