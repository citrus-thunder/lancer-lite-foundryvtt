import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
	build: {
		outDir: resolve(__dirname, 'lancer-lite'),
		emptyOutDir: true,
		lib: {
			name: "lancer-lite",
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
			fileName: "index"
		}
	}
})
