/* eslint-disable no-console */
import archiver from 'archiver'
import axios from 'axios'
import FormData from 'form-data'
import {NODE_DEFAULTS} from '../../defaults'
import {cliArgs} from '../utils'

const createZipArchiveStream = (packagesInstallationPath: string, ignoreDelete) => {
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

export default (deployConfig: DeployConfig) => {
	console.log('Deploying to host ...')

	deployConfig.deploymentIgnoreDelete = (deployConfig.deploymentIgnoreDelete || [])
	deployConfig.deploymentIgnoreDelete.push(...ignorePackagesToDelete)

	const formData = buildFormData(
		createZipArchiveStream(
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
	appName: string,
	deploymentIgnoreDelete?: string[],
	packagesInstallationPath?: string,
	api: {
		baseUrl: string,
		url: string,
	}
}
