/* eslint-disable no-console */
import archiver from 'archiver'
import axios from 'axios'
import FormData from 'form-data'
import fsSync from 'fs'
import Constants from '../../defaults/constants'
import {cliArgs, deploymentEnv, projectConfig} from '../utils'

const createZipArchiveStream = (bundlePath: string, ignoreDelete) => {
	if (fsSync.statSync(bundlePath).isFile()) {
		return fsSync.createReadStream(bundlePath)
	}

	const archive = archiver('zip', {zlib: {level: 9}})

	archive.glob('**/*', {cwd: bundlePath, ignore: ignoreDelete})
	archive.finalize()

	return archive
}

const buildFormData = (archive, ignoreDelete) => {
	const formData = new FormData()
	formData.append('file', archive, {filename: 'build.zip'})
	formData.append('ignoreDelete', JSON.stringify(ignoreDelete))

	return formData
}

const ignorePackagesToDelete = cliArgs.ibd ? [] : ['node_modules/**']

export const deploy = (deployConfig: DeployConfig) => {
	console.log('Deploying to host ...')

	deployConfig.deploymentIgnoreDelete = (deployConfig.deploymentIgnoreDelete || [])
	deployConfig.deploymentIgnoreDelete.push(...ignorePackagesToDelete)

	const formData = buildFormData(
		deployConfig.zipStream
		|| createZipArchiveStream(
			deployConfig.bundlePath || projectConfig.bundle.bundlePath,
			ignorePackagesToDelete,
		),
		deployConfig.deploymentIgnoreDelete,
	)

	return axios({
		method: 'POST',
		baseURL: deployConfig.api.baseUrl,
		url: Constants.DEPLOYMENT_API_PATH,
		data: formData,
		headers: {
			...formData.getHeaders(),
			'app-name': deployConfig.appName,
		},
	})
		.then(
			response => console.log(response.status, JSON.stringify(response.data, null, 4)),
			err => {
				if (err.response) {
					console.log('Api ERROR', err.response.status, JSON.stringify(err.response.data, null, 4))
				} else {
					console.log(err.message)
				}
			},
		)
}

export interface DeployConfig {
	zipStream: ReadableStream;
	appName: string,
	deploymentIgnoreDelete?: string[],
	bundlePath?: string,
	api: {
		baseUrl: string,
	}
}

function getEnvDeploymentConfig() {
	const env = deploymentEnv || 'dev'
	if (env) {
		const config = projectConfig.deployment[env]
		if (!config) {
			throw new Error(`Deployment configuration not found for env: ${env}`)
		}
		return config
	}

	return undefined
}

export const main = deploymentConfig => {
	return deploy({
		appName: projectConfig.appName,
		bundlePath: projectConfig.bundle.bundlePath,
		...projectConfig.deployment,
		...deploymentConfig,
		...getEnvDeploymentConfig(),
	})
}
