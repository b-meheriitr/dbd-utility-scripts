/* eslint-disable no-console */
import archiver from 'archiver'
import axios from 'axios'
import FormData from 'form-data'
import fsSync from 'fs'
import {minimatch} from 'minimatch'
import Constants from '../../defaults/constants'
import {cliArgs, projectConfig} from '../utils'

const createZipArchiveStream = (buildPath: string, ignoreDelete) => {
	if (fsSync.statSync(buildPath).isFile()) {
		return fsSync.createReadStream(buildPath)
	}

	const archive = archiver('zip', {zlib: {level: 9}})

	archive.glob('**/*', {cwd: buildPath, ignore: ignoreDelete})
	archive.finalize()

	return archive
}

const buildFormData = (archive, ignoreDelete) => {
	const formData = new FormData()
	formData.append('file', archive, {filename: 'build.zip'})
	formData.append('ignoreDelete', JSON.stringify(ignoreDelete))

	return formData
}

const filterDependencyPackagePatterns = (list, dependencyPatterns) => {
	return list.filter(
		pattern => !dependencyPatterns.some(blacklistedPattern => minimatch(pattern, blacklistedPattern)),
	)
}

export const deploy = (deployConfig: DeployConfig, options: DeployOptions) => {
	console.log('Deploying to host ...')

	if (options.installDependencyPackages) {
		deployConfig.deploymentIgnoreDelete = filterDependencyPackagePatterns(
			deployConfig.deploymentIgnoreDelete,
			deployConfig.dependencyPackagesFilePatterns,
		)
	}

	const formData = buildFormData(
		deployConfig.zipStream
		|| createZipArchiveStream(
			deployConfig.buildPath,
			deployConfig.deploymentIgnoreDelete,
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
	dependencyPackagesFilePatterns: string[]
	zipStream: ReadableStream
	appName: string
	deploymentIgnoreDelete: string[]
	buildPath: string
	api: {
		baseUrl: string
	}
}

export interface DeployOptions {
	installDependencyPackages: boolean
}

function getEnvDeploymentConfig(deploymentConfig, env = 'dev') {
	if (env) {
		const config = deploymentConfig[env]
		if (!config) {
			throw new Error(`Deployment configuration not found for env: ${env}`)
		}
		return config
	}

	return undefined
}

export const main = buildConfig => {
	return deploy(
		{
			appName: projectConfig.appName,
			buildPath: buildConfig?.buildPath || projectConfig.build.buildPath,
			...projectConfig.deployment,
			...getEnvDeploymentConfig(projectConfig.deployment, cliArgs.env),
			dependencyPackagesFilePatterns: projectConfig.build.dependencyPackagesFilePatterns,
		},
		{
			installDependencyPackages: cliArgs.idp,
		},
	)
}
