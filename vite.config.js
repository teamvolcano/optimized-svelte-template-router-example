import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


export default defineConfig({
	plugins: [sveltekit(),
		//TODO: Setup code splitting
		// chunkSplitPlugin({
		// 	strategy: 'single-vendor',
		// 	customSplitting:{
		// 		// split all components
		// 		// and templates
		// 		atoms: [\src\/]
		// 	}
		// })
	],
	// add componten alias
	resolve: {
		alias: {
			$components: '/src/components',
			$templates: '/src/templates',
		},
	},
	// rollupOptions: {
	// 	manualChunks: {
	// 		vendor: ['svelte', 'svelte/animate', 'svelte/easing', 'svelte/store', 'svelte/transition', 'svelte/internal'],
	// 	},
	// 	output: {
	// 		manualChunks: {
	// 			vendor: ['svelte', 'svelte/animate', 'svelte/easing', 'svelte/store', 'svelte/transition', 'svelte/internal'],
	// 		}
	// 	}
	// },
	// emptyOutDir: true,
	// manifest: true,
	// minify: true,
	modulePreload: {
		// include all components
		// and templates
		include: [
			'/src/components/**/*',
			'/src/templates/**/*',
		],
		polyfill: false,
	},
	rollupOptions: {
		output: {
				chunkFileNames: 'chunk-[name].[hash].js',
				entryFileNames: 'entry-[name].[hash].js',
				inlineDynamicImports: true,
				sourcemap: true,
			},
	},
	sourcemap: true,
});
