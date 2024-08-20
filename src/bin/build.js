#!/usr/bin/env node

import build from '../lib/build'
import {main as deployMain} from '../lib/deploy'
import {cliArgs, copyFilePatterns, filterCommands, logTimeTaken, projectConfig, runCommand} from '../lib/utils'

async function main() {
	const buildCommands = projectConfig.build.buildInfo.commands && filterCommands(
		projectConfig.build.buildInfo.commands,
		cliArgs,
	)

	if (buildCommands && !projectConfig.build.buildInfo.usesDbdBuilder) {
		// eslint-disable-next-line no-restricted-syntax
		for (const command of buildCommands) {
			// eslint-disable-next-line no-console
			console.log(`⏳ running command '${command}'`)
			const timeStart = new Date().getTime()

			// eslint-disable-next-line no-await-in-loop
			await runCommand(command)
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log(`❌ command ${command} failed`)
					throw err
				})

			const timeTaken = new Date().getTime() - timeStart
			// eslint-disable-next-line no-console
			console.log(`✅ completed '${command}' in ${timeTaken > 1000 ? `${timeTaken / 1000}s` : `${timeTaken}ms`}`)
		}
	} else {
		await build(projectConfig.build, cliArgs)
	}

	await copyFilePatterns(projectConfig.build.copyFiles, projectConfig.build.buildPath)

	if (cliArgs.idp) {
		await copyFilePatterns(projectConfig.build.dependencyPackagesFilePatterns, projectConfig.build.buildPath)
	}
}

export default logTimeTaken(
	() => {
		return main()
			.then(() => {
				return cliArgs.deploy && deployMain({buildPath: projectConfig.build.buildPath})
			})
	},
)
