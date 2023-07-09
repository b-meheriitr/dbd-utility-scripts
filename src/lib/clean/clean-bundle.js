#!/usr/bin/env node

import {NODE_DEFAULTS} from '../../defaults'
import {clean, logTimeTaken, projectConfig} from '../../utils'

const NODE_DEFAULTS_BUNDLE = NODE_DEFAULTS.bundle

export default logTimeTaken(
	() => clean({
		dirPath: projectConfig.bundle.packagesInstallationPath || NODE_DEFAULTS_BUNDLE.packagesInstallationPath,
		ignore: projectConfig.bundle.cleanBundleIgnoreDelete || NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete,
	}),
)
