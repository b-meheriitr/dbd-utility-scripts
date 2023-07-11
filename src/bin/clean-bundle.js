#!/usr/bin/env node

import {clean, logTimeTaken, projectConfig} from '../lib/utils'

const NODE_DEFAULTS_BUNDLE = projectConfig.bundle

export default logTimeTaken(
	() => clean({
		dirPath: projectConfig.bundle.bundlePath || NODE_DEFAULTS_BUNDLE.bundlePath,
		ignore: projectConfig.bundle.cleanBundleIgnoreDelete || NODE_DEFAULTS_BUNDLE.cleanBundleIgnoreDelete,
	}),
)
