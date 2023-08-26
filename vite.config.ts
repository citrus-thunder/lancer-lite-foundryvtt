import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
	build: {
		outDir: "lancer-lite",
		minify: process.env.DEBUG == 'true' ? false : 'esbuild',
		emptyOutDir: true,
		lib: {
			name: "lancerlite",
			entry: "src/module/main.ts",
			formats: ["es"],
			fileName: "main"
		}
	}
})
