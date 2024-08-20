/* eslint-disable no-console */
import axios from 'axios'
import FormData from 'form-data'
import Constants from '../../defaults/constants'
import {cliArgs, createZipArchiveStream, filterDependencyPackagePatterns, projectConfig} from '../utils'

const buildFormData = (archive, ignoreDelete) => {
	const formData = new FormData()
	formData.append('file', archive, {filename: 'build.zip'})
	formData.append('ignoreDelete', JSON.stringify(ignoreDelete))

	return formData
}

export const deploy = async (deployConfig: DeployConfig, options: DeployOptions) => {
	console.log(`Deploying to host ${deployConfig.api.baseUrl} ...`)

	if (options.installDependencyPackages) {
		deployConfig.deploymentIgnoreDelete = filterDependencyPackagePatterns(
			deployConfig.deploymentIgnoreDelete,
			deployConfig.dependencyPackagesFilePatterns,
		)
	}

	const formData = buildFormData(
		deployConfig.zipStream || await createZipArchiveStream(deployConfig),
		deployConfig.deploymentIgnoreDelete,
	)

	formData.append('skipRollback', (!!options.skipRollback).toString())

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
	copyFiles: string[]
}

export interface DeployOptions {
	installDependencyPackages: boolean
	skipRollback: boolean
}

function getEnvDeploymentConfig(deploymentConfig, env) {
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
			buildPath: buildConfig?.buildPath || cliArgs.buildPath || projectConfig.build.buildPath,
			...projectConfig.deployment,
			...getEnvDeploymentConfig(projectConfig.deployment, cliArgs.env),
			dependencyPackagesFilePatterns: projectConfig.build.dependencyPackagesFilePatterns,
		},
		{
			installDependencyPackages: cliArgs.idp,
			skipRollback: cliArgs.skipRollback,
		},
	)
}
