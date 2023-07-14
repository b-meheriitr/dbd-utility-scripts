import {isArray, mergeWith} from 'lodash'

export const DEFAULTS = {
	build: {
		copyFiles: [],
		cleanBuildIgnoreDelete: [],
	},
	deployment: {
		deploymentIgnoreDelete: [],
	},
}

export const NODE_DEFAULTS = {
	build: {
		buildInfo: {
			bundle: {
				bundledDependencies: [],
				esbuildConfig: {
					entryPoints: ['src/bin/www.js'],
					bundle: true,
					outfile: 'app.min.js',
					sourcemap: 'inline',
					minify: true,
					metafile: true,
				},
			},
		},
		buildPath: 'dist/bundle',
		cleanBuildIgnoreDelete: ['node_modules'],
		dependencyPackagesFilePatterns: ['node_modules/**'],
	},
	deployment: {
		deploymentIgnoreDelete: ['node_modules/**'],
	},
}

export default mergeWith(
	DEFAULTS,
	NODE_DEFAULTS,
	(srcValue, targetValue) => (isArray(targetValue) ? targetValue : undefined),
)
