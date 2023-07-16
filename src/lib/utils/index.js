/* eslint-disable no-console */
import {exec} from 'child_process'
import fsSync, {promises as fs} from 'fs'
import {glob} from 'glob'
import {camelCase, mapKeys, mapValues} from 'lodash'
import minimist from 'minimist'
import path from 'path'
import {rimraf} from 'rimraf'
import url from 'url'
import PROJECT_TYPE_DEFAULT_CONFIG, {CLI_ARGS_DEFAULTS, mergeOverride} from '../../defaults'

export const runCommand = (command, cwd) => {
	return new Promise((resolve, reject) => {
		exec(command, {cwd}, (error, stdout, stderr) => {
			if (error) {
				reject(error)
			}

			resolve({stderr, stdout})
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

export const cliArgs = mergeOverride(
	{
		...mapValues(
			mapKeys(minimist(process.argv.slice(2)), (_, key) => camelCase(key)),
			value => {
				if (value === 'true') {
					return true
				}
				if (value === 'false') {
					return false
				}
				return value
			},
		),
		_originalArgsString: process.argv.slice(2).join(' '),
	},
	CLI_ARGS_DEFAULTS,
)

export const projectConfig = mergeOverride(
	PROJECT_TYPE_DEFAULT_CONFIG,
	JSON.parse(returnSubstituteIfErr(() => fsSync.readFileSync('.scripts.config.json'), '{}')),
)

export function logTimeTaken(action) {
	const startTime = new Date().getTime()

	return Promise.resolve(action())
		.catch(err => {
			if (cliArgs.logStackTrace) {
				console.error(err.stack)
			} else {
				console.error(err.message)
			}
		})
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

export function copyFilesToArchiver(archiver, fileCopyPatterns) {
	fileCopyPatterns.forEach(filePattern => {
		if (typeof filePattern === 'string') {
			archiver.glob(filePattern, {cwd: './', dot: true})
		} else {
			archiver.glob(
				filePattern.pattern,
				{
					cwd: filePattern.cwd,
					ignore: filePattern.ignore,
					dot: true,
				},
			)
		}
	})
}

export const copyFilePatterns = (filePatterns, destinationDir) => {
	return Promise.all(
		filePatterns.map(async filePattern => {
			const {cwd, pattern = '**/*', ignore} = typeof filePattern === 'string'
			                                        ? {cwd: './', pattern: filePattern, ignore: []}
			                                        : filePattern

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

export function isHttpUrl(str) {
	try {
		const parsedUrl = new url.URL(str)
		return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
	} catch (error) {
		return false
	}
}
