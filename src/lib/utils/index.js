/* eslint-disable no-console */
import {spawn} from 'child_process'
import fsSync, {promises as fs} from 'fs'
import {glob} from 'glob'
import {camelCase, isArray, mapKeys, mergeWith} from 'lodash'
import minimist from 'minimist'
import path from 'path'
import {rimraf} from 'rimraf'
import PROJECT_TYPE_DEFAULT_CONFIG from '../../defaults'

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

export const cliArgs = mapKeys(minimist(process.argv.slice(2)), (_, key) => camelCase(key))

export const deploymentEnv = cliArgs.env

export const projectConfig = mergeWith(
	PROJECT_TYPE_DEFAULT_CONFIG,
	JSON.parse(returnSubstituteIfErr(() => fsSync.readFileSync('.scripts.config.json'), '{}')),
	(srcValue, targetValue) => (isArray(targetValue) ? targetValue : undefined),
)

export function logTimeTaken(action) {
	const startTime = new Date().getTime()

	return Promise.resolve(action())
		.finally(() => {
			if (projectConfig.profileTime !== false) {
				const timeTakenInMillis = new Date().getTime() - startTime
				console.log(
					'\n-- time taken: ',
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

export const copyFilePatterns = (filePatterns, destinationDir) => {
	return Promise.all(
		filePatterns.map(async ({cwd, pattern = '**/*', ignore}) => {
			const matchedFiles = await glob(pattern, {cwd, ignore, dot: true})

			return Promise.all(
				matchedFiles.map(async file => {
					const sourceFilePath = path.join(cwd, file)
					const destinationFilePath = path.join(destinationDir, file)

					if ((await fs.stat(sourceFilePath)).isFile()) {
						try {
							fsSync.mkdirSync(
								path.dirname(destinationFilePath),
								{recursive: true},
							)
						} catch (e) {
							if (e.code !== 'EEXIST') throw e
						}

						return fs.copyFile(sourceFilePath, destinationFilePath)
					}

					return -1
				}),
			)
		}),
	)
}
