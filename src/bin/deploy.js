#!/usr/bin/env node

import nodeDeploy from '../lib/deploy/node'
import {deploymentEnv, logTimeTaken, projectConfig} from '../lib/utils'

function getEnvDeploymentConfig() {
	if (deploymentEnv) {
		const config = projectConfig.deployment[deploymentEnv]
		if (!config) {
			throw new Error(`Deployment configuration not found for env: ${deploymentEnv}`)
		}
		return config
	}

	return undefined
}

export default logTimeTaken(() => {
	return nodeDeploy({
		appName: projectConfig.appName,
		packagesInstallationPath: projectConfig.bundle.packagesInstallationPath,
		...projectConfig.deployment,
		...getEnvDeploymentConfig(),
	})
})
