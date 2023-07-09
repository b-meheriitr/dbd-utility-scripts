/* eslint-disable no-console */
import {spawn} from 'child_process'
import fsSync, {promises as fs} from 'fs'
import minimist from 'minimist'
import path from 'path'
import {rimraf} from 'rimraf'

export const runCommand = (command, args, cwd = null) => {
	return new Promise((resolve, reject) => {
		const process = spawn(command, args, {cwd})

		process.stdout.on('data', data => console.log(data.toString()))

		process.stderr.on('data', data => console.error(data.toString()))

		process.on('close', code => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`Command '${command} ${args.join(' ')}' exited with code ${code}`))
			}
		})
	})
}

export function returnSubstituteIfErr(syncAction, substitute = null) {
	try {
		return syncAction()
	} catch (e) {
		return substitute
	}
}

export const cliArgs = minimist(process.argv.slice(2))

export const projectConfig = JSON.parse(
	returnSubstituteIfErr(() => fsSync.readFileSync('.scripts.config.json'), '{}'),
)

export function logTimeTaken(action) {
	const startTime = new Date().getTime()

	return Promise.resolve(action())
		.finally(() => {
			if (projectConfig.profileTime) {
				const timeTakenInMillis = new Date().getTime() - startTime
				console.log(
					'time taken: ',
					timeTakenInMillis > 1000
						? `${timeTakenInMillis / 1000}s`
						: `${timeTakenInMillis}ms`,
				)
			}
		})
}

export const clean = ({dirPath, ignore = []}) => {
	return fs.readdir(dirPath)
		.then(files => {
			return Promise.all(
				files.map(file => {
					const filePath = path.join(dirPath, file)

					if (!ignore.includes(file)) {
						return rimraf.rimraf(filePath)
					}

					return Promise.resolve(-1)
				}),
			)
		})
		.catch(err => {
			if (!(/no such file or directory/.test(err.message))) {
				throw err
			}
		})
}
