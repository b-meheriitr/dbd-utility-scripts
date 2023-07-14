/* eslint-disable no-console */
import esbuild from 'esbuild'
import fsSync, {promises as fs} from 'fs'
import _ from 'lodash'
import path from 'path'
import {copyFilePatterns, runCommand} from '../utils'

const projectPackageJson = JSON.parse(fsSync.readFileSync('./package.json').toString())

const isBundledDepsAllDeps = ({bundledDependencies}) => bundledDependencies === '*' || bundledDependencies[0] === '*'

function createPackageJsonFile(config) {
	return fs.writeFile(
		path.join(config.buildPath, 'package.json'),
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

async function installPackages({buildPath}) {
	await fs.cp(
		'package-lock.json',
		path.join(buildPath, 'package-lock.json'),
	)

	return runCommand(`npm install --prefix=${path.join(process.cwd(), buildPath)}`)
		.then(() => fs.rm(path.join(buildPath, 'package-lock.json')))
}

export default ({buildInfo: {bundle: bundleInfo}, ...config}, args = {}) => {
	return esbuild.build({
		...bundleInfo.esbuildConfig,
		platform: 'node',
		outfile: path.join(config.buildPath, bundleInfo.esbuildConfig.outfile),
		// eslint-disable-next-line no-nested-ternary
		external: bundleInfo.esbuildConfig.bundle
		          ? isBundledDepsAllDeps(bundleInfo)
		            ? Object.keys(projectPackageJson.dependencies)
		            : bundleInfo.bundledDependencies
		          : undefined,
	})
		.then(({metafile}) => bundleInfo.esbuildConfig.metafile && console.log(esbuild.analyzeMetafileSync(metafile)))
		.then(() => createPackageJsonFile({buildPath: config.buildPath, ...bundleInfo}))
		.then(async () => {
			if (args.idp) { // idp stand for installDependencyPackages
				console.log('installing non-bundle-able packages')
				await installPackages(config)
					.then(
						() => console.log('Packages installed successfully'),
						err => console.error(`Error installing packages: ${err.stack}`),
					)
			}
		})
		.then(() => copyFilePatterns(config.copyFiles, config.buildPath))
		.catch(err => {
			console.error(err)
			return process.exit(1)
		})
}
