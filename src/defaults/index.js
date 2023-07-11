export const NODE_DEFAULTS = {
	bundle: {
		bundlePath: 'dist/bundle',
		bundledDependencies: [],
		esbuildConfig: {
			entryPoints: ['src/bin/www.js'],
			bundle: true,
			outfile: 'app.min.js',
			sourcemap: 'inline',
			minify: true,
			metafile: true,
		},
		cleanBundleIgnoreDelete: ['node_modules'],
	},
}

export default NODE_DEFAULTS
