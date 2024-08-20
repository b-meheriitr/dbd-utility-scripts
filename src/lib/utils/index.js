/* eslint-disable no-console */
import archiver from 'archiver'
import axios from 'axios'
import {exec} from 'child_process'
import fsSync, {promises as fs} from 'fs'
import {glob} from 'glob'
import {camelCase, mapKeys, mapValues} from 'lodash'
import {minimatch} from 'minimatch'
import minimist from 'minimist'
import path from 'path'
import {rimraf} from 'rimraf'
import url from 'url'
import PROJECT_TYPE_DEFAULT_CONFIG, {CLI_ARGS_DEFAULTS, mergeOverride} from '../../defaults'

export const runCommand = (command, cwd) => {
	return new Promise((resolve, reject) => {
		const childProcess = exec(command, {cwd}, (error, stdout, stderr) => {
			if (error) {
				reject(error)
			}

			resolve({stderr, stdout})
		})

		childProcess.stdout.on('data', data => {
			console.info(`${data}`)
		})

		childProcess.stderr.on('data', data => {
			console.info(`${data}`)
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
	CLI_ARGS_DEFAULTS,
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
		buildEnvs: minimist(process.argv.slice(2)).buildEnvs?.split(','),
		_originalArgsString: process.argv.slice(2).join(' '),
	},
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

export function copyFilesToArchiver(archiverObj, fileCopyPatterns) {
	fileCopyPatterns.forEach(filePattern => {
		if (typeof filePattern === 'string') {
			archiverObj.glob(filePattern, {cwd: './', dot: true})
		} else {
			archiverObj.glob(
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

export const createZipArchiveStream = async ({
	                                             buildPath,
	                                             deploymentIgnoreDelete: ignoreDelete,
	                                             copyFiles,
	                                             ...config
}) => {
	if (isHttpUrl(buildPath)) {
		const {data} = await axios({
			method: 'get',
			url: buildPath,
			responseType: 'arraybuffer',
			...config.artifactZipUrlConfig,
		})
			.catch(err => {
				if (err.response.status === 404) {
					throw new Error(
						JSON.stringify(JSON.parse(Buffer.from(err.response.data).toString()), null, 4),
					)
				}
				throw err
			})

		return data
	}
	if ((await fs.stat(buildPath).then(stat => stat.isFile(), () => false))) {
		return fsSync.createReadStream(buildPath)
	}

	const archive = archiver('zip', {zlib: {level: 9}})

	archive.glob('**/*', {cwd: buildPath, ignore: ignoreDelete, dot: true})

	if (copyFiles) {
		copyFilesToArchiver(archive, copyFiles)
	}

	archive.finalize()

	return archive
}

export const filterDependencyPackagePatterns = (list, dependencyPatterns) => {
	return list.filter(
		pattern => !dependencyPatterns.some(blacklistedPattern => minimatch(pattern, blacklistedPattern)),
	)
}

export const filterCommands = (commands, {buildEnvs, _originalArgsString}) => {
	return commands.map(command => {
		if (typeof command === 'string') return command

		// console.log(command)
		if (command.env !== undefined || command.envs !== undefined) {
			command.envs = command.envs || (command.env !== undefined ? [command.env] : [])
			// console.log(command.envs.some(env => buildEnvs.includes(env)), !command.override)

			if (command.envs.some(env => buildEnvs.includes(env))) {
				return command
			}
			return false
		}

		return command.override
			.find(overRideCommand => overRideCommand.envs.some(env => buildEnvs.includes(env)))
			|| command
	})
		.filter(c => c)
		.map(command => {
			const cmd = command.command || command

			const match = cmd.match(/(.*?) <cliArgs>\S*$/)

			if (match) {
				// eslint-disable-next-line no-underscore-dangle
				return `${match[1]} ${_originalArgsString}`
			}
			return cmd
		})
}

if (!cliArgs.logInfo) {
	console.info = function () {
	}
}
