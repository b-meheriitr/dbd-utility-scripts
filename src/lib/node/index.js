#!/usr/bin/env node

/* eslint-disable no-console */
import esbuild from 'esbuild'
import fsSync, {promises as fs} from 'fs'
import _ from 'lodash'
import minimist from 'minimist'
import path from 'path'
import {nullIfError, runCommand} from '../../utils'

const projectPackageJson = JSON.parse(fsSync.readFileSync('./package.json').toString())
const projectConfig = JSON.parse(
	nullIfError(() => fsSync.readFileSync('.scripts.json')).toString() || {},
)

const {packagesInstallationPath, bundledDependencies, ...CONFIG} = {
	packagesInstallationPath: 'dist/bundle',
	bundledDependencies: [],
	entryPoints: ['src/bin/www.js'],
	bundle: true,
	outFile: 'app.min.js',
	sourcemap: 'inline',
	minify: true,
	metafile: true,
	...projectConfig,
}

function isBundledDepsAllDeps() {
	return bundledDependencies === '*' || bundledDependencies[0] === '*'
}

function createPackageJsonFile() {
	return fs.writeFile(
		path.join(packagesInstallationPath, 'package.json'),
		JSON.stringify(
			_.pick(
				projectPackageJson,
				[
					'name',
					'engines',
					'version',
					...(isBundledDepsAllDeps()
						? ['dependencies']
						: bundledDependencies.map(b => (`dependencies.${b}`))
					),
				],
			),
			null,
			2,
		),
	)
}

async function installPackages() {
	await fs.cp(
		'package-lock.json',
		path.join(packagesInstallationPath, 'package-lock.json'),
	)

	return runCommand('npm', ['install', `--prefix=${path.join(process.cwd(), packagesInstallationPath)}`])
		.then(() => fs.rm(path.join(packagesInstallationPath, 'package-lock.json')))
}

export default esbuild.build({
	entryPoints: CONFIG.entryPoints,
	bundle: CONFIG.bundle,
	outfile: path.join(packagesInstallationPath, CONFIG.outFile),
	platform: 'node',
	sourcemap: CONFIG.sourcemap,
	minify: CONFIG.minify,
	metafile: CONFIG.metafile,
	external: isBundledDepsAllDeps() ? Object.keys(projectPackageJson.dependencies) : bundledDependencies,
})
	.then(({metafile}) => CONFIG.metafile && console.log(esbuild.analyzeMetafileSync(metafile)))
	.then(() => createPackageJsonFile())
	.then(async () => {
		if (minimist(process.argv.slice(2)).ibd) { // ibd stand for installBundledDependencies
			console.log('installing non-bundled packages')
			await installPackages()
				.then(
					() => console.log('Packages installed successfully'),
					err => console.error(`Error installing packages: ${err.stack}`),
				)
		}
	})
	.catch(err => {
		console.error(err)
		return process.exit(1)
	})
