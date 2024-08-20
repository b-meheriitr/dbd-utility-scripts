#!/usr/bin/env node

import fsSync, {promises as fs} from 'fs'
import moment from 'moment'
import path from 'path'
import {cliArgs, createZipArchiveStream, filterDependencyPackagePatterns, projectConfig} from '../lib/utils'

const main = async (buildConfig, deploymentConfig, options) => {
	const outFile = path.join(
		'.zips',
		`${moment().format('DD-MM-YYYY_HH-mm-ss')}.zip`,
	)
	await fs.mkdir(path.dirname(outFile), {recursive: true})

	const outputStream = fsSync.createWriteStream(outFile)

	if (options.installDependencyPackages) {
		deploymentConfig.deploymentIgnoreDelete = filterDependencyPackagePatterns(
			deploymentConfig.deploymentIgnoreDelete,
			buildConfig.dependencyPackagesFilePatterns,
		)
	}

	const archiver = await createZipArchiveStream({
		buildPath: buildConfig.buildPath,
		deploymentIgnoreDelete: deploymentConfig.deploymentIgnoreDelete,
		copyFiles: deploymentConfig.copyFiles,
	})

	return new Promise((resolve, reject) => {
		archiver.on('error', err => reject(err))
		outputStream.on('error', err => reject(err))
		outputStream.on('close', () => resolve(outFile))
		archiver.pipe(outputStream)
	})
		// eslint-disable-next-line no-console
		.then(out => console.log('done zipping', out))
}

export default main(
	projectConfig.build,
	projectConfig.deployment,
	{
		installDependencyPackages: cliArgs.idp,
	},
)
