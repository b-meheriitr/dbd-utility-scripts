/* eslint-disable no-console */
import archiver from 'archiver'
import axios from 'axios'
import FormData from 'form-data'
import fsSync from 'fs'
import {NODE_DEFAULTS} from '../../defaults'
import {cliArgs, deploymentEnv, projectConfig} from '../utils'

const createZipArchiveStream = (packagesInstallationPath: string, ignoreDelete) => {
	if (fsSync.statSync(packagesInstallationPath).isFile()) {
		return fsSync.createReadStream(packagesInstallationPath)
	}

	const archive = archiver('zip', {zlib: {level: 9}})

	archive.glob('**/*', {cwd: packagesInstallationPath, ignore: ignoreDelete})
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
			deployConfig.packagesInstallationPath || NODE_DEFAULTS.bundle.packagesInstallationPath,
			ignorePackagesToDelete,
		),
		deployConfig.deploymentIgnoreDelete,
	)

	return axios({
		method: 'POST',
		baseURL: deployConfig.api.baseUrl,
		url: deployConfig.api.url,
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
	packagesInstallationPath?: string,
	api: {
		baseUrl: string,
		url: string,
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
		packagesInstallationPath: projectConfig.bundle.packagesInstallationPath,
		...projectConfig.deployment,
		...deploymentConfig,
		...getEnvDeploymentConfig(),
	})
}
