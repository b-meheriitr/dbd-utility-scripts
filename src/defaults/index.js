import {isArray, mergeWith} from 'lodash'

export const mergeOverride = (json1, json2) => {
	return mergeWith(
		json1,
		json2,
		(srcValue, targetValue) => (isArray(targetValue) ? targetValue : undefined),
	)
}

export const DEFAULTS = {
	build: {
		copyFiles: [],
		cleanBuildIgnoreDelete: [],
		buildoh: {
			copyFiles: [],
		},
	},
	deployment: {
		deploymentIgnoreDelete: [],
	},
}

export const CLI_ARGS_DEFAULTS = {
	env: 'default',
	buildEnvs: ['default'],
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

export default mergeOverride(
	DEFAULTS,
	NODE_DEFAULTS,
)
