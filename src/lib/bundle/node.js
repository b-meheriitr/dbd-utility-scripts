/* eslint-disable no-console */
import esbuild from 'esbuild'
import fsSync, {promises as fs} from 'fs'
import _ from 'lodash'
import path from 'path'
import {copyFilePatterns, projectConfig, runCommand} from '../utils'

const NODE_DEFAULTS_BUNDLE = projectConfig.bundle

const projectPackageJson = JSON.parse(fsSync.readFileSync('./package.json').toString())

const isBundledDepsAllDeps = ({bundledDependencies}) => bundledDependencies === '*' || bundledDependencies[0] === '*'

function createPackageJsonFile(config) {
	return fs.writeFile(
		path.join(config.bundlePath, 'package.json'),
		JSON.stringify(
			_.pick(
				projectPackageJson,
				[
					'name',
					'engines',
					'version',
					...(isBundledDepsAllDeps(config)
						? ['dependencies']
						: config.bundledDependencies.map(b => (`dependencies.${b}`))
					),
				],
			),
			null,
			2,
		),
	)
}

async function installPackages({bundlePath}) {
	await fs.cp(
		'package-lock.json',
		path.join(bundlePath, 'package-lock.json'),
	)

	return runCommand(
		'npm',
		['install', `--prefix=${path.join(process.cwd(), bundlePath)}`],
	)
		.then(() => fs.rm(path.join(bundlePath, 'package-lock.json')))
}

export default (
	{
		bundlePath,
		copyFiles: filePatternsToCopy = [],
		bundledDependencies,
		esbuildConfig,
	},
	args = {},
) => {
	const config = {
		bundlePath: bundlePath || NODE_DEFAULTS_BUNDLE.bundlePath,
		bundledDependencies: bundledDependencies || NODE_DEFAULTS_BUNDLE.bundledDependencies,
		esbuildConfig: {
			...NODE_DEFAULTS_BUNDLE.esbuildConfig,
			...esbuildConfig,
		},
	}

	return esbuild.build({
		...config.esbuildConfig,
		platform: 'node',
		outfile: path.join(config.bundlePath, config.esbuildConfig.outfile),
		// eslint-disable-next-line no-nested-ternary
		external: config.esbuildConfig.bundle
			? isBundledDepsAllDeps(config)
				? Object.keys(projectPackageJson.dependencies)
				: config.bundledDependencies
			: undefined,
	})
		.then(({metafile}) => config.esbuildConfig.metafile && console.log(esbuild.analyzeMetafileSync(metafile)))
		.then(() => createPackageJsonFile(config))
		.then(async () => {
			if (args.ibd) { // ibd stand for installBundledDependencies
				console.log('installing non-bundled packages')
				await installPackages(config)
					.then(
						() => console.log('Packages installed successfully'),
						err => console.error(`Error installing packages: ${err.stack}`),
					)
			}
		})
		.then(() => copyFilePatterns(filePatternsToCopy, bundlePath))
		.catch(err => {
			console.error(err)
			return process.exit(1)
		})
}
