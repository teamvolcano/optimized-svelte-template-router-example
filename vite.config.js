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
	resolve: {
		alias: {
			$components: '/src/components',
			$templates: '/src/templates',
			$lib: '/src/lib',
		},
	},
});
