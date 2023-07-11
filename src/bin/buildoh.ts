#!/usr/bin/env node

/* eslint-disable @typescript-eslint/ban-ts-comment,no-console */
import archiver from 'archiver'
import axios from 'axios'
import FormData from 'form-data'
import fsSync, {promises as fs} from 'fs'
import {glob} from 'glob'
import ignore from 'ignore'
import path from 'path'
import {main} from '../lib/deploy/node'
import {cliArgs, logTimeTaken, projectConfig} from '../lib/utils'

function getFileContent(filePath) {
	return fsSync.existsSync(filePath)
		? fsSync.readFileSync(filePath).toString()
		: ''
}

// bug: doesnt include nested .gits
const gitIgnorePatterns = ignore()
	.add('.git')
	.add(getFileContent('.gitignore'))
	.add(getFileContent('.git/info/exclude'))

const createBuildZipArchiveStream = async config => {
	const archive = archiver('zip', {zlib: {level: 9}})
	const codeFiles = await glob('**/*', {cwd: '.', dot: true, ignore: config.codeBaseZipIgnore})

	await Promise.all(
		codeFiles.map(async codeFilePath => {
			if (!gitIgnorePatterns.ignores(codeFilePath)) {
				if ((await fs.stat(codeFilePath)).isFile()) {
					archive.file(codeFilePath, {name: codeFilePath})
				}
			}
		}),
	)

	archive.finalize()

	return archive
}

const buildFormData = archive => {
	const formData = new FormData()
	formData.append('file', archive, {filename: 'codebase.zip'})

	return formData
}

const toDeploy = (options: BuildCliOptions) => {
	if (options.deploy) return true

	return false
}

const toDownloadZip = (options: BuildCliOptions) => {
	if (options.downloadTo) return true
	if (options.noDownload) return false
	if (toDeploy(options)) return false

	return true
}

function createWriteStream(filePath) {
	const str = fsSync.createWriteStream(filePath)
	fsSync.mkdirSync(path.dirname(filePath), {recursive: true})

	return str
}

const fun = (buildConfig: BuildConfig, options: BuildCliOptions) => {
	console.log('Sending source codes to build host ...')

	return createBuildZipArchiveStream(buildConfig)
		.then(async archive => {
			const formData = buildFormData(archive)

			formData.append('body', JSON.stringify({
				downloadBuildZip: toDownloadZip(options) || toDeploy(options),
				buildInfo: buildConfig.buildInfo,
			}))

			const response = await axios({
				method: 'POST',
				baseURL: buildConfig.api.baseUrl,
				url: buildConfig.api.url,
				data: formData,
				headers: {
					...formData.getHeaders(),
					'app-name': buildConfig.appName,
				},
				responseType: 'stream',
				maxBodyLength: Infinity,
			})

			// @ts-ignore
			const {resolve: resolveZipDownload, promise: zipDownloadPromise, reject: rejectZipDownload} = (() => {
				const resolveReject: any = {}
				const promise = new Promise((resolve, reject) => {
					resolveReject.resolve = resolve
					resolveReject.reject = reject
				})

				return {...resolveReject, promise}
			})()

			// @ts-ignore
			const {resolve: resolveDeploy, promise: deployPromise, reject: rejectDeploy} = (() => {
				const resolveReject: any = {}
				const promise = new Promise((resolve, reject) => {
					resolveReject.resolve = resolve
					resolveReject.reject = reject
				})

				return {...resolveReject, promise}
			})()

			const totalPromise = Promise.all([zipDownloadPromise, deployPromise])

			let fileWriter: fsSync.WriteStream
			const tempWriter = createWriteStream('.out/temp/null')

			// @ts-ignore
			tempWriter.write = chunk => {
				const chunkString = chunk.toString()
				if (/^message: /.test(chunkString)) {
					console.log(chunkString)
				} else if (/^info-attachment: /.test(chunkString)) {
					const match = chunkString.match(/^info-attachment: attachment name: (.+)/)

					if (match && !fileWriter) {
						const zipPath = toDownloadZip(options)
							? path.join(options.downloadTo || '.zips', match[1])
							: path.join('.out/temp', match[1])

						fileWriter = createWriteStream(zipPath)
						fsSync.mkdirSync(path.dirname(fileWriter.path.toString()), {recursive: true})

						fileWriter.on('finish', () => resolveZipDownload(fileWriter.path))
						fileWriter.on('error', rejectZipDownload)
					} else {
						console.log(chunkString)
					}
				} else if (fileWriter) {
					fileWriter.write(chunk)
				} else if (/^error: /.test(chunkString)) {
					rejectZipDownload(JSON.parse(chunkString.match(/^error: (.+)/)[1]))
				} else {
					console.log(chunkString)
				}
			}

			tempWriter.on('finish', () => fileWriter && fileWriter.end())
			tempWriter.on('error', e => fileWriter && fileWriter.destroy(e))

			response.data.pipe(tempWriter)

			response.data.on('error', () => rejectZipDownload('Stream closed abruptly'))

			if (toDownloadZip(options)) {
				zipDownloadPromise.then(() => console.log(`Downloaded zip to ${fileWriter.path}`))
			} else {
				response.data.on('end', () => {
					if (fileWriter) {
						fileWriter.on('finish', resolveZipDownload)
					} else {
						resolveZipDownload()
					}
				})
			}

			if (toDeploy(options)) {
				zipDownloadPromise.then(() => {
					main({packagesInstallationPath: fileWriter.path})
						.then(() => {
							if (!toDownloadZip(options)) {
								fsSync.rmSync(fileWriter.path)
							}
						})
						.then(resolveDeploy, rejectDeploy)
				})
			} else {
				resolveDeploy()
			}

			return totalPromise
		})
		.catch(console.error)
}

export interface BuildConfig {
	appName: string,
	codeBaseZipIgnore?: string[],
	api: {
		baseUrl: string,
		url: string,
	}
	buildInfo?: any,
}

export interface BuildCliOptions {
	deploy: boolean
	downloadTo?: string,
	noDownload?: boolean
}

export default logTimeTaken(() => {
	return fun(
		{
			...projectConfig.buildoh,
			appName: projectConfig.appName,
		},
		cliArgs,
	)
})
