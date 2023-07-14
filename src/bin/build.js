#!/usr/bin/env node

import build from '../lib/build'
import {cliArgs, logTimeTaken, projectConfig, runCommand} from '../lib/utils'

function main() {
	const buildCommands = projectConfig.build.buildInfo.commands
	if (buildCommands && !projectConfig.build.buildInfo.usesDbdBuilder) {
		return async () => {
			// eslint-disable-next-line no-restricted-syntax
			for (const command of buildCommands) {
				// eslint-disable-next-line no-console
				console.info(`⏳ running command '${command}'`)
				const timeStart = new Date().getTime()

				// eslint-disable-next-line no-await-in-loop
				const {stderr, stdout} = await runCommand(command)
					.catch(err => {
						// eslint-disable-next-line no-console
						console.info(`❌ command ${command} failed`)
						throw err
					})

				// eslint-disable-next-line no-console
				stdout && console.info(`ℹ️ ${stdout}`)
				// eslint-disable-next-line no-console
				stderr && console.info(`⚠️ ${stderr}`)

				const timeTaken = new Date().getTime() - timeStart
				// eslint-disable-next-line no-console
				console.info(`✅ completed '${command}' in ${timeTaken > 1000 ? `${timeTaken / 1000}s` : `${timeTaken}ms`}`)
			}
		}
	}
	return () => build(projectConfig.build, cliArgs)
}

export default logTimeTaken(main())
